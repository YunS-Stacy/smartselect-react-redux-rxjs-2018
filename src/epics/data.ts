import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import { ajax } from 'rxjs/observable/dom/ajax';

import { Observable, AjaxRequest } from 'rxjs/Rx';
import {
  takeUntil,
  filter,
  map,
  mapTo,
  mergeMap,
  switchMap,
} from 'rxjs/operators';

import {
  DATA_FETCH,
  DATA_FETCH_CANCELLED,
  POPUP_FETCH,
  DATA_FETCH_REJECTED,
  ROUTE_FETCH,
  IS_LOADED
} from '../constants/action-types';
import { Store, Action } from '../types/redux';
import { DATA_URL, getZillowComps, getDirections } from '../constants/app-constants';
import {
  fetchDataFulfilled, fetchDataLoading,
  fetchDataRejected, fetchData
} from '../reducers/app/actions';

type IAction = Action & { payload?: any };
(mapboxgl as any).accessToken = process.env.MAPBOX_TOKEN;

// const fetchDataEpic = (action$: ActionsObservable<IAction>) => action$
//   .ofType(DATA_FETCH)
//   .filter(val => val.payload === 'slider')
//   .mergeMap(() => Observable.empty<never>());

const fetchSliderEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(DATA_FETCH)
  // check no data
  .filter(action => action.payload === 'slider' && store.getState().slider.fetched === false)
  .pipe(
    mergeMap(action =>
      ajax.getJSON(DATA_URL.FIREBASE.SLIDER)
        .pipe(
          map(data => fetchDataFulfilled({ data, name: 'slider' })),
          takeUntil(action$.ofType(DATA_FETCH_CANCELLED).pipe(
            filter(action => action.payload === 'slider'),
            mapTo({ type: 'failed' }),
          )),
      ),
    ),
);

// begin fetch other data after map is loaded
const beginFetchEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(IS_LOADED)
  .take(1)
  // check no data
  .switchMapTo([fetchData('market'), fetchData('correlation')]);

const fetchMarketEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(DATA_FETCH)
  // check no data
  .filter(action => action.payload === 'market' && store.getState().market.fetched === false)
  .switchMap(action => Observable.ajax.getJSON(DATA_URL.FIREBASE.MARKET)
    .pipe(
      map(data => fetchDataFulfilled({ data, name: 'market' })),
      takeUntil(action$.ofType(DATA_FETCH_CANCELLED).pipe(
        filter(action => action.payload === 'market'),
        mapTo({ type: 'failed' }),
      )),
    ),
);

const fetchCorrelationEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(DATA_FETCH)
  // check no data
  .filter(action => action.payload === 'correlation' && store.getState().correlation.fetched === false)
  .switchMap(action => Observable.ajax.getJSON(DATA_URL.FIREBASE.CORRELATION)
    .pipe(
      map(data => fetchDataFulfilled({ data, name: 'correlation' })),
      takeUntil(action$.ofType(DATA_FETCH_CANCELLED).pipe(
        filter(action => action.payload === 'correlation'),
        mapTo({ type: 'failed' }),
      )),
  ),
);

const zillowCompsRequest = (zpid: string) => ({
  url: getZillowComps(zpid),
  crossDomain: true,
  method: 'GET',
  responseType: 'document',
} as AjaxRequest);

/**
 *
 * @param profile Routing profiles for Mapbox Directions API: 'driving-traffic', 'driving', 'walking', 'cycling'
 * @param origin Origin point geomegraphic coordinates
 * @param dest Origin point geomegraphic coordinates
 */
const routeRequest = (
  profile: string,
  origin: {
    lat: number; lng: number;
  },
  dest: {
    lat: number; lng: number;
  },
) => ({
  url: getDirections(profile, origin, dest),
  crossDomain: true,
  method: 'GET',
} as AjaxRequest);

const fetchPopupEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(POPUP_FETCH)
  // check no data
  .filter(() => store.getState().popup.fetched === false)
  .pipe(
    switchMap(action =>
      Observable.concat(
        // set loading
        Observable.of(fetchDataLoading('popup')),
        // ajax
        Observable.ajax(zillowCompsRequest(action.payload))
          .pipe(
            // check http status
            filter(res => res.status >= 200 && res.status < 300),
            map((res: any) => {
              const statusCode = Number(Array.from((res.response as XMLDocument).getElementsByTagName('code'))[0]
                .innerHTML);
              // filter if has a correct response or not
              if ((statusCode !== 502) && (statusCode !== 503)) {
                return fetchDataFulfilled({ data: res.response, name: 'popup' });
              }
              return fetchDataRejected({
                name: 'popup', message: `Property ZPID: ${action.payload} Has Found No Comparables in Zillow Database.`,
              });
            }),
            takeUntil(action$.ofType(DATA_FETCH_CANCELLED, DATA_FETCH_REJECTED).pipe(
              filter(action => action.payload === 'popup'),
            )),
        ),
      ),
    ),
);

const fetchRouteEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(ROUTE_FETCH)
  .pipe(
    switchMap(action =>
      Observable.concat(
        // set loading
        Observable.of(fetchDataLoading('route')),
        // ajax
        Observable.ajax(routeRequest(action.payload.profile, store.getState().marker.coords, action.payload.dest))
          .pipe(
            // check http status
          filter(res => res.status >= 200 && res.status < 300),
            // filter if has a correct response or not
            map((res: any) =>
              res.response.code === 'Ok' ? fetchDataFulfilled({ data: res.response.routes[0].geometry, name: 'route' })
                : fetchDataRejected({ name: 'route', message: 'Fetch Route Error.' }),
            ),
            takeUntil(action$.ofType(DATA_FETCH_CANCELLED, DATA_FETCH_REJECTED).pipe(
              filter(action => action.payload === 'route'),
            )),
        ),
      ),
    ),
);

export const epics = combineEpics(
  fetchSliderEpic,
  fetchPopupEpic,
  fetchRouteEpic,

  beginFetchEpic,
  fetchMarketEpic,
  fetchCorrelationEpic,

);

export default epics;
