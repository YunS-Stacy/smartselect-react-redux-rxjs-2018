import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';

import { Observable } from 'rxjs/Rx';
import {
  of,
} from 'rxjs/observable/of';
import {
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

(mapboxgl as any).accessToken = MAPBOX_TOKEN;

let map$: Observable<mapboxgl.Map>;

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

const initMapEpic = (action$: ActionsObservable<Action>) => action$
.ofType(MAP_INIT)
.pipe(
  // construct map
  map((action: Action & { payload?: HTMLDivElement }) => {
    const instance = new mapboxgl.Map({
      ...MAP_SETTINGS_DEFAULT,
      container: 'map',
    });
    instance.addControl(scaleControl,'bottom-right');
    instance.addControl(naviControl,'bottom-right');
    instance.addControl(drawControl,'bottom-right');
    instance.addControl(geolocateControl,'bottom-right');
    return instance;
  }),
  // skip until map is loaded
  skipWhile(val => val.loaded() === true),
  // get map instance
  tap(instance => map$ = of(instance)),
  // dispatch action
  mapTo(mapLoaded()),
);

export const epics = combineEpics(
  initMapEpic,
);

export default epics;
