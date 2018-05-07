import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ajax } from 'rxjs/observable/dom/ajax';

import { Observable, AjaxRequest } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { _throw } from 'rxjs/observable/throw';
import {
  take,
  takeLast,
  takeUntil,
  takeWhile,
  filter,
  map,
  mapTo,
  mergeMap,
  tap,
  throttleTime,
  distinctUntilChanged,
  skipWhile,
  skipUntil,
  retry,
  catchError,
  ignoreElements,
  switchMap,
  retryWhen,
  delay,
  sampleTime,
  sample,
  dematerialize,
  delayWhen,
} from 'rxjs/operators';

import {
  APP_TOGGLE,
  DATA_FETCH,
  DATA_FETCH_CANCELLED,
  POPUP_FETCH,
  DATA_FETCH_REJECTED
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
    ajax.getJSON(DATA_URL.firebase)
      .pipe(
        map(data => fetchDataFulfilled({ data, name: 'slider' })),
        takeUntil(action$.ofType(DATA_FETCH_CANCELLED).pipe(
          filter(action => action.payload === 'slider'),
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

const compsDirectionRequest = (
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
  .do(val => console.log(val))
  .pipe(
    switchMap(action =>
      Observable.concat(
        // set loading
        Observable.of(fetchDataLoading('popup')),
        // ajax
        Observable.ajax(zillowCompsRequest(action.payload))
          .pipe(

          tap((res: any) => {
            console.log(Array.from((res.response as XMLDocument).getElementsByTagName('code'))[0].innerHTML);

          }),
          // get response
          filter(res => res.status === 200),
          // filter if has a correct response or not
          map((res: any) =>
            Number(Array.from((res.response as XMLDocument).getElementsByTagName('code'))[0]
              .innerHTML) !== 503 ? fetchDataFulfilled({ data: res.response, name: 'popup' })
              : fetchDataRejected({ name:'popup', message: 'No Comps Found' }),
          ),
          takeUntil(action$.ofType(DATA_FETCH_CANCELLED, DATA_FETCH_REJECTED).pipe(
            filter(action => action.payload === 'popup'),
          )),
        ),
      ),
    ),
  );

export const epics = combineEpics(
  fetchSliderEpic,
  fetchPopupEpic,
);

export default epics;
