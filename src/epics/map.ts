import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';

import { Observable } from 'rxjs/Rx';
import {
  of,
} from 'rxjs/observable/of';
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
} from 'rxjs/operators';

import { APP_TOGGLE, MAP_INIT, IS_LOADED, INSTANCE_SET } from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import { setInstance, mapLoaded } from '../reducers/map/actions';
import { MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT } from '../constants/app-constants';
import { setMode } from '../reducers/mode/actions';

(mapboxgl as any).accessToken = MAPBOX_TOKEN;

let map$: Observable<mapboxgl.Map>;
let mapping: mapboxgl.Map;

const scaleControl = new mapboxgl.ScaleControl({ unit: 'imperial' });
const geolocateControl = new mapboxgl.GeolocateControl();
const naviControl = new mapboxgl.NavigationControl();
const drawControl = new mapboxDraw({
  displayControlsDefault: true,
  controls: {
    polygon: true,
    trash: true,
  },
});
const geocoderControl = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
});

const initMapEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(MAP_INIT)
.pipe(
  take(1),
  // construct map
  map((action: Action) => {
    const instance = new mapboxgl.Map({
      ...MAP_SETTINGS_DEFAULT,
      container: 'map',
    });
    // instance.addControl(scaleControl,'bottom-right');
    // instance.addControl(naviControl,'bottom-right');
    // instance.addControl(drawControl,'bottom-right');
    // instance.addControl(geolocateControl,'bottom-right');
    map$ = of(instance);
    mapping = instance;
    return instance;
  }),
  // skip until map is loaded
  skipWhile(instance => instance.loaded() === true),
  take(1),
  // get map instance
  // map(instance => setInstance(instance)),
  // dispatch action
  mapTo(mapLoaded()),
);

const intoAppEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(APP_TOGGLE)
.pipe(
  filter(_ => store.getState().app === true),
  tap(() => {
    mapping = mapping.addControl(scaleControl, 'top-right');
    console.log(mapping, 'mapping');
  }),
  mapTo(setMode('welcome')),
  filter(_ => store.getState().app !== true),
  tap(() => {
    mapping = mapping.removeControl(scaleControl);
    console.log(mapping, 'mapping');
  }),
  mapTo(setMode('intro')),
);

export const epics = combineEpics(
  initMapEpic,
  (intoAppEpic as any),
);

export default epics;
