import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import * as turf from 'turf';
import polygonToLine from '@turf/polygon-to-line';
import area from '@turf/area';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { interval } from 'rxjs/observable/interval';

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

import {
  APP_TOGGLE,
  MAP_INIT, IS_LOADED, INSTANCE_SET, MODE_SET, MAP_RESET, GEOMETRY_GET
} from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import { setInstance, mapLoaded, resetMap, setLayer, setMode, setGeometry } from '../reducers/map/actions';
import { MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT, MAP_CAMERA, MAP_STYLES } from '../constants/app-constants';
import { FeatureCollection, Feature, GeometryObject, LineString, Polygon, Point } from 'geojson';

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
    point: false,
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
    // check if map is loaded
    mergeMap(
      // send signal per 1000ms
      () => interval(1000),
      (val: mapboxgl.Map, timer: number) => val,
      2,
    ),
    // take 1 time when loaded is true
    filter((val: mapboxgl.Map) => val.loaded()),
    take(1),
    mapTo(mapLoaded()),
);

const resetMapEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(MAP_RESET)
  .pipe(
    // reset map when exit the map application
    tap(() => {
      mapping.easeTo(MAP_SETTINGS_DEFAULT);
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
        return mapping.on('load', () => {
          mapping.setLayoutProperty('aptParcel', 'visibility', 'visible');
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
    tap(() => {
      console.log(mapping, (window as any).mapping, 'check after HMR');
      mapping.easeTo({
        ...MAP_CAMERA.plane,
        zoom: 15,
      });
      mapping.setLayoutProperty('footprint', 'visibility', 'none');
      mapping.addControl(scaleControl, 'bottom-right');
      mapping.addControl(naviControl, 'bottom-right');
      mapping.addControl(geolocateControl, 'bottom-right');
    }),
    mergeMap(() => Observable.empty<never>()),
);

const setModeQueryEpic = (action$: ActionsObservable<Action & { payload: string }>) => action$
  .ofType(MODE_SET)
  .pipe(
    filter((action: Action & { payload: string }) => action.payload === 'query'),
    map(() => mapping.setStyle(MAP_STYLES.light)),
    // check if map style is loaded
    mergeMap(
      // send signal per 1000ms
      () => interval(1000),
      (val: mapboxgl.Map, timer: number) => val,
      2,
    ),
    // take 1 time when loaded is true
    filter((val: mapboxgl.Map) => val.isStyleLoaded()),
    take(1),
    // set layer vizs after map style is loaded
    map((val: mapboxgl.Map) => {
      val.setLayoutProperty('vacantParcel', 'visibility', 'visible');
      val.setLayoutProperty('aptParcel', 'visibility', 'visible');
    }),
    mergeMap(() => Observable.empty<never>()),
);

const setModeMeasureEpic = (action$: ActionsObservable<Action & { payload: string }>) => action$
  .ofType(MODE_SET)
  .pipe(
    filter((action: Action & { payload: string }) => action.payload === 'measure'),
    tap(() => {
      mapping.setLayoutProperty('aptParcel', 'visibility', 'none');
      mapping.addControl(drawControl, 'bottom-right');
      mapping.on('draw.create', (e: Event) => console.log(e));
    }),
    mergeMap(() => Observable.empty<never>()),
);

const getGeometryEpic = (action$: ActionsObservable<Action>) => action$
  .ofType(GEOMETRY_GET)
  .pipe(
    map(() => {
      const data: FeatureCollection<any> = drawControl.getAll();
      const num: number = data.features.length;

      const lines: Feature<LineString>[] = data.features
        .filter(datum => datum.geometry.type === 'LineString');
      const line = lines && lines[lines.length - 1];
      const lineLength = turf.lineDistance(line, 'miles');
      const polygons: Feature<Polygon>[] = data.features
        .filter(item => item.geometry.type === 'Polygon');
      const polygon = polygons && polygons[polygons.length - 1];
      const polyLength = turf.lineDistance(polygonToLine(polygon), 'miles');
      const polyArea = area(polygon) * 10.7639;
      return {
        num,
        line: { length: lineLength },
        polygon: { length: polyLength, area: polyArea },
      };
    }),
    map(val => setGeometry(val)),
);

const checkMapLoadingEpic = (action$: ActionsObservable<Action>) => action$
  // for internal use in this epic middleware
  .ofType('LOADED_CHECK')
  .pipe(
    mergeMap(
      // send signal per 1000ms
      () => interval(1000),
      (_: Action, timer: number) => mapping,
      2,
    ),
    // take 1 time when loaded is true
    filter((val: mapboxgl.Map) => val.loaded()),
    take(1),
    mapTo(mapLoaded()),
);

export const epics = combineEpics(
  initMapEpic,
  enterAppEpic,
  setModeIntroEpic,
  setModeQueryEpic,
  setModeMeasureEpic,
  // SetModeBuildEpic,
  // setModeDecideE
  resetMapEpic,
  checkMapLoadingEpic,
  getGeometryEpic,
);

export default epics;
