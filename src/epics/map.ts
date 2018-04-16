import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { Observable } from 'rxjs/Rx';
import {
  of,
} from 'rxjs/observable/of';

import {
  interval,
} from 'rxjs/observable/interval';

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
} from 'rxjs/operators';

import { APP_TOGGLE, MAP_INIT, IS_LOADED, INSTANCE_SET, MODE_SET, MAP_RESET } from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import { setInstance, mapLoaded, resetMap, setLayer } from '../reducers/map/actions';
import { MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT, MAP_CAMERA, MAP_STYLES } from '../constants/app-constants';
import { setMode } from '../reducers/mode/actions';

type IAction = Action & { payload?: any };
(mapboxgl as any).accessToken = MAPBOX_TOKEN;

let mapping: mapboxgl.Map;
(window as any).mapping = mapping;

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

const initMapEpic = (action$: ActionsObservable<Action & { payload: HTMLDivElement }>) => action$
  .ofType(MAP_INIT)
  .pipe(
    // construct map
    map((action: Action) => {
      const el = document.getElementById('map');
      // const children = el.child;
      const container = document.createElement('div');
      // test if has already a map container
      const oldChild = el.firstChild;
      oldChild ? el.replaceChild(container, oldChild) : el.appendChild(container);
      mapping = new mapboxgl.Map({
        ...MAP_SETTINGS_DEFAULT,
        container,
      });
      return mapping.on('load', () => {
        (window as any).mapping = mapping;
      });
    }),
    // for internal use in this map epic middleware
    mapTo({ type: 'LOADED_CHECK' }),
);

const resetMapEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(MAP_RESET)
  .pipe(
    // reset map when exit the map application
    tap(() => {
      (mapping || (window as any).mapping).easeTo(MAP_SETTINGS_DEFAULT);
      // set layers viz
      mapping.setLayoutProperty('footprint', 'visibility', 'visible');
    }),
    mergeMap(() => Observable.empty<never>()),
);

const enterAppEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(APP_TOGGLE)
  .pipe(
    mergeMap(
      () => of(store.getState().app),
      (_: Action, app: boolean) => app,
      2,
    ),
    // decide either enter or exit
    map((app: boolean) => app ? setMode('intro') : resetMap()),
);

const setCameraEpic = (action$: ActionsObservable<Action & { payload: string }>) => action$
  .ofType(MODE_SET)
  .pipe(    // set camera for each map mode
    map(({ payload }: IAction) => {
      if (payload === 'intro' || payload === 'query') {
        mapping.easeTo({
          ...MAP_CAMERA.plane,
          zoom: 15,
        });

        // mapping.setLayoutProperty('footprint', 'visibility', 'none');
        mapping.setStyle(MAP_STYLES.light);
        mapping.on('load', () => {
          mapping.setLayoutProperty('aptParcel', 'visibility', 'visible');
          return mapping;
        });
        // return setLayer('footprint', mapping.getLayer('footptint').layout.visibility);
      }
      return mapping.easeTo(MAP_CAMERA.perspective);
    }),
    mergeMap(() => Observable.empty<never>()),
);

const setModeIntroEpic = (action$: ActionsObservable<Action & { payload: string }>) => action$
  .ofType(MODE_SET)
  .pipe(
    filter((action: Action & { payload: string }) => action.payload === 'intro'),
    map(() => {
      (mapping || (window as any).mapping).easeTo({
        ...MAP_CAMERA.plane,
        zoom: 15,
      });
      mapping.setLayoutProperty('footprint', 'visibility', 'none');
    }),
    mergeMap(() => Observable.empty<never>()),
);

const setModeQueryEpic = (action$: ActionsObservable<Action & { payload: string }>) => action$
  .ofType(MODE_SET)
  .pipe(
    filter((action: Action & { payload: string }) => action.payload === 'query'),
    map(() => {
      (mapping || (window as any).mapping).setStyle(MAP_STYLES.light);
      (mapping || (window as any).mapping).setLayoutProperty('vacantParcel', 'visibility', 'visible');
      (mapping || (window as any).mapping).setLayoutProperty('aptParcel', 'visibility', 'visible');

    }),
);

const checkMapLoadingEpic = (action$: ActionsObservable<Action>) => action$
  // for internal use in this map epic middleware
  .ofType('LOADED_CHECK')
  .pipe(
    mergeMap(
      // send signal per 1000ms
      () => interval(1000),
      (_: Action, timer: number) => mapping,
      2,
    ),
    // take 1 time when loaded is true
    filter((map: mapboxgl.Map) => map.loaded()),
    take(1),
    map((val: mapboxgl.Map) => setInstance(val.getStyle())),
    mapTo(mapLoaded()),

);

export const epics = combineEpics(
  initMapEpic,
  enterAppEpic,
  setModeIntroEpic,
  // setModeQueryEpic,
  // setModeMeasureEpic,
  // SetModeBuildEpic,
  // setModeDecideE
  // resetMapEpic,
  checkMapLoadingEpic,
);

export default epics;
