import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ajax } from 'rxjs/observable/dom/ajax';

import { Observable } from 'rxjs/Rx';
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
  IS_LOADED,
  STEP_ADD,
} from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import { setInstance, mapLoaded, resetMap, setLayer, setMode, setGeometry, setStep } from '../reducers/map/actions';
import { MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT, MAP_CAMERA, MAP_STYLES, DATA_URL } from '../constants/app-constants';
import { FeatureCollection, Feature, GeometryObject, LineString, Polygon, Point, GeoJsonObject } from 'geojson';
import { fetchDataFulfilled } from '../reducers/app/actions';

type IAction = Action & { payload?: any };
(mapboxgl as any).accessToken = MAPBOX_TOKEN;

const fetchDataEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(FETCH_DATA)
.take(1)
.filter(() => store.getState().slider.fetched === false)
.do(() => console.log('begin fetch'))
// wait until map is loaded
.pipe(
  switchMap(action =>
    ajax.getJSON(DATA_URL.slider)
      .pipe(
        map((response) => {
          console.log(response, 'response');
          return fetchDataFulfilled({ data: response, name: 'slider' });
        }),
        takeUntil(action$.ofType(FETCH_DATA_CANCELLED).pipe(
          filter(action => action.payload === 'slider'),
          mapTo({ type: 'failed' }),
        )),
      ),
  ),
);

export const epics = combineEpics(
  fetchDataEpic,
);

export default epics;
