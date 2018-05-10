import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ajax } from 'rxjs/observable/dom/ajax';

import { Observable, AjaxRequest } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import {
  takeUntil,
  filter,
  map,
  mapTo,
  mergeMap,
  tap,
  throttleTime,
  switchMap,
} from 'rxjs/operators';

import {
  APP_TOGGLE,
  DATA_FETCH,
  DATA_FETCH_CANCELLED,
  POPUP_FETCH,
  DATA_FETCH_REJECTED,
  ROUTE_FETCH
} from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import { setInstance, mapLoaded, resetMap, setLayer, setMode, setGeometry, setStep } from '../reducers/map/actions';
import {
  MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT, MAP_CAMERA, MAP_STYLES, DATA_URL, getZillowComps, getDirections
} from '../constants/app-constants';
import { FeatureCollection, Feature, GeometryObject, LineString, Polygon, Point, GeoJsonObject } from 'geojson';
import { fetchDataFulfilled, fetchDataLoading, fetchDataCancelled, fetchDataRejected } from '../reducers/app/actions';

type IAction = Action & { payload?: any };
(mapboxgl as any).accessToken = MAPBOX_TOKEN;

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

const fetchCorrelationEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(DATA_FETCH)
  // check no data
  .filter(action => action.payload === 'correlation' && store.getState().correlation.fetched === false)
  .pipe(
    mergeMap(action =>
      ajax.getJSON(DATA_URL.FIREBASE.CORRELATION)
        .pipe(
          map(data => fetchDataFulfilled({ data, name: 'correlation' })),
          takeUntil(action$.ofType(DATA_FETCH_CANCELLED).pipe(
            filter(action => action.payload === 'correlation'),
            mapTo({ type: 'failed' }),
          )),
      ),
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
          filter(res => res.status === 200),
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
            filter(res => res.status === 200),
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
  fetchCorrelationEpic,
  fetchPopupEpic,
  fetchRouteEpic,
);

export default epics;
