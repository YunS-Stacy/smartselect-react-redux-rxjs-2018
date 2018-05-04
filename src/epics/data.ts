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
  FETCH_DATA,
  FETCH_DATA_CANCELLED,
  POPUP_FETCH
} from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import { setInstance, mapLoaded, resetMap, setLayer, setMode, setGeometry, setStep } from '../reducers/map/actions';
import {
  MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT, MAP_CAMERA, MAP_STYLES, DATA_URL, getZillowComps
} from '../constants/app-constants';
import { FeatureCollection, Feature, GeometryObject, LineString, Polygon, Point, GeoJsonObject } from 'geojson';
import { fetchDataFulfilled, fetchDataLoading } from '../reducers/app/actions';

type IAction = Action & { payload?: any };
(mapboxgl as any).accessToken = MAPBOX_TOKEN;

// const fetchDataEpic = (action$: ActionsObservable<IAction>) => action$
//   .ofType(FETCH_DATA)
//   .filter(val => val.payload === 'slider')
//   .mergeMap(() => Observable.empty<never>());

const fetchSliderEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(FETCH_DATA)
// check no data
  .filter(() => store.getState().slider.fetched === false)
.pipe(
  mergeMap(action =>
    ajax.getJSON(DATA_URL.firebase)
      .pipe(
        map(data => fetchDataFulfilled({ data, name: 'slider' })),
        takeUntil(action$.ofType(FETCH_DATA_CANCELLED).pipe(
          filter(action => action.payload === 'slider'),
          mapTo({ type: 'failed' }),
        )),
      ),
  ),
);

const zillowCompsRequest = (zpid: string) => ({
  url: getZillowComps(zpid),
  async: true,
  crossDomain: true,
  withCredentials: false,
  headers: {},
  method: 'GET',
  responseType: 'document',
  timeout: 0,
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
        Observable.ajax(zillowCompsRequest('1'))
          .pipe(
            filter(res => res.status === 200),
            map(res => fetchDataFulfilled({ data: res.response, name: 'popup' })),
            takeUntil(action$.ofType(FETCH_DATA_CANCELLED).pipe(
              filter(action => action.payload === 'popup'),
              mapTo({ type: 'failed' }),
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
