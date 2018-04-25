import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import * as turf from 'turf';

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
  MAP_INIT, IS_LOADED, INSTANCE_SET, MODE_SET, MAP_RESET, GEOMETRY_GET, STEP_ADD, STEP_MINUS, STEP_SET, GEOMETRY_SET
} from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import { setInstance, mapLoaded, resetMap, setLayer, setMode, setGeometry, setStep } from '../reducers/map/actions';
import { MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT, MAP_CAMERA, MAP_STYLES } from '../constants/app-constants';
import { FeatureCollection, Feature, GeometryObject, LineString, Polygon, Point, GeoJsonObject } from 'geojson';

type IAction = Action & { payload?: any };
(mapboxgl as any).accessToken = MAPBOX_TOKEN;

let mapping: mapboxgl.Map;
(window as any).mapping = mapping;
const mappingControls: Map<string, mapboxgl.Control> = new Map();

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

const controlSet = new Map()
.set('scale', scaleControl)
.set('geolocate', geolocateControl)
.set('navi', naviControl)
.set('draw', drawControl)
.set('geocoder', geocoderControl);

const addMapControl = (name: string) => {
  // haven't added yet
  if (mapping && !mappingControls.has(name)) {
    mapping.addControl(controlSet.get(name), 'bottom-right');
    mappingControls.set(name, controlSet.get(name));
  }
  return mapping;
};

const removeMapControl = (name: string) => {
  // haven't removed yet
  if (mapping && mappingControls.has(name)) {
    mapping.removeControl(controlSet.get(name));
    mappingControls.delete(name);
  }
  return mapping;
};

const blueprintSrc: null | mapboxgl.GeoJSONSource =
mapping && (mapping.getSource('blueprint') as mapboxgl.GeoJSONSource);

const blueprintSrcFromStore = (store: Store) => {
  const features = store
  .getState().map.geometry
  .get('polygon');
  console.log(features);
  return {
    features,
    type: 'FeatureCollection',
  } as GeoJSON.FeatureCollection<mapboxgl.GeoJSONGeometry>;
};

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
    // mergeMap(
    //   // send signal per 1000ms
    //   () => interval(1000),
    //   (val: mapboxgl.Map, timer: number) => val,
    //   2,
    // ),
    // // take 1 time when loaded is true
    // filter((val: mapboxgl.Map) => val.loaded()),
    // take(1),
    // mapTo(mapLoaded(true)),
    mapTo({ type: 'CHECK_MAP' }),
);

const resetMapEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(MAP_RESET)
  .pipe(
    // reset map when exit the map application
    tap(() => {
      // remove control
      ['scale', 'navi', 'geolocate'].forEach(item => removeMapControl(item));

      // go to default camera
      mapping.easeTo(MAP_SETTINGS_DEFAULT);

      // set layers viz
      mapping.setLayoutProperty('footprint', 'visibility', 'visible');
    }),
    mapTo({ type: 'CHECK_MAP' }),
  );

const enterAppEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(APP_TOGGLE)
  .pipe(
    mergeMap(
      () => of(store.getState().app),
      (_: Action, app: boolean) => {
        if (app) {
          return setStep(0);
        }
        return resetMap();
      },
    ),
    // decide either enter or exit
    // map((app: boolean) => app ? setStep(0) : resetMap()),
);

// const setCameraEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
//   .ofType(STEP_SET, STEP_ADD, STEP_MINUS)
//   .mapTo(store.getState().map.step)
//   .pipe(    // set camera for each map mode
//     tap((val: number) => {
//       if (val === 0) {
//         return mapping = !/light/i.test(mapping.getStyle().name)
//         ? mapping.setStyle(MAP_STYLES.light)
//         : mapping;
//       }
//       if (val === 'intro' || payload === 'query') {
//         mapping.easeTo({
//           ...MAP_CAMERA.plane,
//           zoom: 15,
//         });

//         // mapping.setLayoutProperty('footprint', 'visibility', 'none');
//         mapping.setStyle(MAP_STYLES.light);
//         mapping.on('load', () => {
//           mapping.setLayoutProperty('aptParcel', 'visibility', 'visible');
//         });
//         // return setLayer('footprint', mapping.getLayer('footptint').layout.visibility);
//       }
//       mapping.easeTo(MAP_CAMERA.perspective);
//     }),
//     mergeMap(() => Observable.empty<never>()),
// );

const setModeIntroEpic = (action$: ActionsObservable<Action & { payload: number }>, store: Store) => action$
  .ofType(STEP_SET, STEP_MINUS)
  .pipe(
    filter(action => store.getState().map.step === 0),
    tap(() => {
      console.log('step is 0'),
      mapping.easeTo({
        ...MAP_CAMERA.plane,
        zoom: 15,
      });
      mapping.setLayoutProperty('footprint', 'visibility', 'none');
      ['scale', 'navi', 'geolocate'].forEach(item => addMapControl(item));

      // mapping.on('data', (ev: mapboxgl.MapDataEvent) => {
      //   console.log(ev.dataType, mapping.isStyleLoaded, 'check event and loaded');
      //   console.log('on data style ev');
      // });
    }),
    mapTo({ type: 'CHECK_MAP' }),
    // map(val => mapLoaded(val)),
);

const setModeIntroMinusEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(STEP_MINUS)
.pipe(
  filter(() => store.getState().map.step === 0),
  tap(_ => console.log('minus to here')),
  tap(() =>
    mapping.setStyle(MAP_STYLES.customized),
  ),
  mapTo({ type: 'CHECK_MAP' }),
);

const setModeQueryEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
  .ofType(STEP_ADD)
.pipe(
    filter(() => store.getState().map.step === 1),
    map(() => mapping.setStyle(MAP_STYLES.light)),
    // wait until map style is loaded
    mergeMap(
      // send signal per 1000ms
      () => timer(1000, 1000),
      (val, timer: number) => val,
    ),
    // take 1 time when loaded is true
    skipWhile(val => mapping.isStyleLoaded() === false),
    // set layer vizs after map style is loaded
    tap(() => {
      mapping.setLayoutProperty('vacantParcel', 'visibility', 'visible');
      mapping.setLayoutProperty('aptParcel', 'visibility', 'visible');
    }),

    mapTo({ type: 'CHECK_MAP' }),
);

interface MapboxDrawEvent extends Event {
  features: GeoJSON.Feature<mapboxgl.GeoJSONGeometry>[];
}

const setModeMeasureEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
  .ofType(STEP_ADD, STEP_MINUS)
  .pipe(
    filter(() => store.getState().map.step === 2),
    tap(() => console.log('step is 2')),
    map(() => {
      // hide aptParcel layer
      mapping.setLayoutProperty('aptParcel', 'visibility', 'none');
      // add drawing control
      addMapControl('draw');
      // prepare source for blueprint layer
      mapping.on('data.create', (ev: MapboxDrawEvent) => mapping);
      return mapping;
    }),
    // sample(interval(1000)),

    // mergeMap(
    //   () => interval(1000),
    //   (loaded, checkLoaded) => {console.log('merge timer', loaded, mapping.loaded());return loaded;},
    // ),

    mapTo({ type: 'CHECK_MAP' }),
    // mergeMap((obs1$) => {

    //   return fromEvent(mapping, 'draw.create');
    // }),
    // map(e => setGeometry((e as any).features)),
    // mergeMap(() => Observable.empty<never>()),
);

const drawCreateEventEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
  .ofType(IS_LOADED)
  .pipe(
    filter(() => (store.getState().map.step === 2 && store.getState().map.loaded)),
    tap(() => console.log('step is 2 and finish loading')),
    take(1),
    switchMap(() => {
      // listen to the draw create event, map event to the drawn features
      return fromEvent(mapping, 'draw.create');
    }),
    map((ev: MapboxDrawEvent) => setGeometry(ev.features)),
    // mergeMap((obs1$) => {

    //   return fromEvent(mapping, 'draw.create');
    // }),
    // map(e => setGeometry((e as any).features)),
    // mergeMap(() => Observable.empty<never>()),
);

const setGeometryEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(GEOMETRY_SET)
.pipe(
  tap(() => {
    console.log('check source', mapping.getSource('blueprint'));
  // add source for the first time
    if (!mapping.getSource('blueprint')) {
      return mapping.addSource('blueprint', {
        type: 'geojson',
        data: blueprintSrcFromStore(store),
      });
    }
  // modify data frome 2nd time
    return (mapping.getSource('blueprint') as mapboxgl.GeoJSONSource).setData(blueprintSrcFromStore(store));
  }),
  tap(val => console.log(val, 'check source')),
  mapTo({ type: 'CHECK_MAP' }),
);

const setModeBuildEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
  .ofType(STEP_ADD, STEP_MINUS)
  .pipe(
    filter(() => store.getState().map.step === 3),
    map(() => {
      removeMapControl('draw');
      mapping.easeTo({
        ...MAP_CAMERA.perspective,
      });
      // mapping.on('data', (ev: mapboxgl.MapDataEvent) => {
      //   console.log(ev.dataType, mapping.isStyleLoaded, 'check event and loaded');
      //   console.log('on data style ev');
      // });
      // get draw data from prev step
      mapping.setStyle(MAP_STYLES.customized);
      return mapping.once('data', (ev: mapboxgl.MapDataEvent) => {
        const isSrc = mapping.getSource('blueprint');
        const isStyleEv = ev.dataType === 'style';
        const isLayer = mapping.getLayer('blueprint');

        if (isStyleEv && isSrc && isLayer) {
          const blueprintLyr: mapboxgl.Layer = {
            id: 'blueprint',
            type: 'fill-extrusion',
            source: 'blueprint',
            paint: {
              'fill-extrusion-color': '#fbb217',
              'fill-extrusion-height': 0,
              'fill-extrusion-opacity': 0.8,
            },
            layout: {
              visibility: 'visible',
            },
          };
          mapping.addLayer(blueprintLyr);
        }

        const isFootprintViz = mapping.getLayoutProperty('footprint', 'visibility') === 'visible';

        if (isFootprintViz) {
          console.log(isFootprintViz,'footprint viz');
          mapping.setLayoutProperty('footprint', 'visibility', 'none');
        }
        return mapping;
      });

    }),
    // map(val => of(val)),
    // takeUntil(val.isStyleLoaded() === true),
    // check mapping per 1s,
    mapTo({ type: 'CHECK_MAP' }),
    // // check for map style loading
    // map((val) => {
    //   console.log(val, 'inside map');
    //   if (mapping.isStyleLoaded() === false) {
    //     throw mapping;
    //   }
    //   return mapLoaded(mapping.isStyleLoaded());
    // }),
    // retryWhen((err) => {
    //   return err.pipe(
    //     tap(val => console.log(val, 'error')),
    //     delayWhen(() => timer(1000)),
    //   );
    // }),
);

const setModeDecideEpic = (action$: ActionsObservable<IAction>, store: Store) => action$
.ofType(STEP_ADD, STEP_MINUS)
.pipe(
  filter(() => store.getState().map.step === 4),
  tap(() => {
    const isFootprintViz = mapping.getLayoutProperty('footprint', 'visibility') === 'visible';
    if (!isFootprintViz) {
      mapping.setLayoutProperty('footprint', 'visibility', 'visible');
    }
    return mapping;
  }),
  mapTo({ type: 'CHECK_MAP' }),
);

const checkMapEpic = (action$: ActionsObservable<Action>) => action$
.ofType('CHECK_MAP')
.pipe(
  // check for map style loading
  mergeMap(
    // emit mapping value every 1000ms
    () => timer(1000),
    (action, timer) => {
      // check if the style is loaded
      if (mapping.isStyleLoaded() === false) {
        // if not, retry the action
        return ({ type: 'CHECK_MAP' });
      }
      return mapLoaded(true);
    },
  ),
);

const getGeometryEpic = (action$: ActionsObservable<Action>) => action$
  .ofType(GEOMETRY_GET)
  .pipe(
    map(() => {
      // get all draws as feature collection on the map
      const data: FeatureCollection<GeometryObject> = drawControl.getAll();
      console.log(data, 'check data');

      return setGeometry(data.features);

    }),
);

// const checkMapLoadingEpic = (action$: ActionsObservable<Action>) => action$
//   // for internal use in this epic middleware
//   .ofType('LOADED_CHECK')
//   .pipe(
//     mergeMap(
//       // send signal per 1000ms
//       () => interval(1000),
//       (_: Action, timer: number) => mapping,
//       2,
//     ),
//     // take 1 time when loaded is true
//     filter((val: mapboxgl.Map) => val.loaded()),
//     take(1),
//     mapTo(mapLoaded(true)),
// );

export const epics = combineEpics(
  initMapEpic,
  enterAppEpic,
  setModeIntroEpic,
  setModeIntroMinusEpic,
  setModeQueryEpic,
  setModeMeasureEpic,
  setModeBuildEpic,
  setGeometryEpic,
  setModeDecideEpic,
  resetMapEpic,
  // checkMapLoadingEpic,
  drawCreateEventEpic,
  getGeometryEpic,
  checkMapEpic,
);

export default epics;
