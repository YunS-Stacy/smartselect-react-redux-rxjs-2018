import { combineEpics, ActionsObservable } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import * as turf from 'turf';
import center from '@turf/center';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { _throw } from 'rxjs/observable/throw';
import {
  race,
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
  debounceTime,
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
  switchMapTo,
} from 'rxjs/operators';

import {
  APP_TOGGLE,
  MAP_INIT, IS_LOADED,
  INSTANCE_SET, MODE_SET, MAP_RESET, MAP_CHECK,
  GEOMETRY_GET, GEOMETRY_SET,
  STEP_ADD, STEP_MINUS, STEP_SET, LAYER_VIZ_SET, STYLE_SET, GEOMETRY_HEIGHT_SET,
} from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import {
  setInstance, mapLoaded, checkMap, resetMap,
  setLayer, setMode, setGeometry, setStep, setLayerViz, setStyle, setGeometryHeight, removeGeometry
} from '../reducers/map/actions';
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
    line_string: true,
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

const blueprintLyr: mapboxgl.Layer = {
  id: 'blueprint',
  type: 'fill-extrusion',
  source: 'blueprint',
  paint: {
    'fill-extrusion-color': '#fbb217',
    'fill-extrusion-height': {
      type: 'exponential',
      property: 'height',
      // translate height 'feet' to 'meters' => HEIGHT * 0.3048
      stops: [[0,0], [1000, 304.8]],
    },
    'fill-extrusion-opacity': 0.8,
  },
  layout: {
    visibility: 'visible',
  },
};

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
  .filter((item: any) => item.geometry.type === 'Polygon')
  // set id to null -> align with the geojson featurecollection type
  .map((item: any) => ({
    ...item,
    id: null,
  }));
  console.log(store
    .getState().map.geometry);
  return {
    features,
    type: 'FeatureCollection',
  } as GeoJSON.FeatureCollection<mapboxgl.GeoJSONGeometry>;
};

const initMapEpic = (action$: ActionsObservable<Action>) => action$
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
      (window as any).mapping = mapping;
      return mapping;
      // mapping.on('load', () => {
      //   (window as any).mapping = mapping;
      //   mapping.setLayoutProperty('footprint', 'visibility', 'visible');
      // });
    }),
    switchMap(val => Observable
      .fromEvent(val, 'load')
      .mapTo(setLayerViz({ name: 'footprint', viz: 'visible' })),
    ),
);

const resetMapEpic = (action$: ActionsObservable<Action>) => action$
  .ofType(MAP_RESET)
  .pipe(
    // reset map when exit the map application
    map(() => {
      // remove control
      ['scale', 'navi', 'geolocate'].forEach(item => removeMapControl(item));
      // go to default camera
      mapping.easeTo(MAP_SETTINGS_DEFAULT);
      if (mapping.getLayer('blueprint')) {
        mapping.removeLayer('blueprint');
        mapping.removeSource('blueprint');
      }
      return setLayerViz({ name: 'footprint', viz: 'visible' });
      // mapping.setLayoutProperty('footprint', 'visibility', 'visible');
    }),
  );

const enterAppEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(APP_TOGGLE)
  .pipe(
    switchMap(
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

const setModeIntroEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(STEP_SET)
.pipe(
  filter(action => store.getState().map.step === 0),
  map(() => {
    console.log('step is 0'),
    mapping.easeTo({
      ...MAP_CAMERA.plane,
      zoom: 15,
    });
    ['scale', 'navi', 'geolocate'].forEach(item => addMapControl(item));
    // const val = mapping.setLayoutProperty('footprint', 'visibility', 'none');
    return mapping;
  }),
  mapTo(setLayerViz({ name: 'footprint', viz: 'none' })),
);

const setModeIntroMinusEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(STEP_MINUS)
.pipe(
  filter(() => store.getState().map.step === 0),
  tap(_ => console.log('minus to here')),
  map(() => mapping.setStyle(MAP_STYLES.customized)),
  switchMap(val => Observable.concat(
    // actions: check map -> set layer viz(-> check map)
    Observable.of(setStyle('customized')),
    // set layer viz after set style,
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
    .take(1)
    .mapTo(setLayerViz({ name: 'vacantParcel', viz: 'none' })),
    Observable.of(mapLoaded(false)),
    // set layer viz after set style,
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
    .take(1)
    .mapTo(setLayerViz({ name: 'aptParcel', viz: 'none' })),
    // check map after all actions dispatched
  )),
);

const setModeQueryEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(STEP_ADD, STEP_MINUS)
.pipe(
  filter(() => store.getState().map.step === 1),
  map(() => {
    if (!/light/i.test(mapping.getStyle().name)) {
      mapping.setStyle(MAP_STYLES.light);
    }
    return mapping;
  }),
  switchMap(val => Observable.concat(
    // actions: check map -> set layer viz(-> check map)
    Observable.of(setStyle('light')),
    // set layer viz after set style,
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.dataType === 'source' && val.isSourceLoaded)
    .take(1)
    .mapTo(setLayerViz({ name: 'vacantParcel', viz: 'visible' })),
    // set layer viz after set style,
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.dataType === 'source' && val.isSourceLoaded)
    .do(val => console.log(val, 'chain'))
    .take(1)
    .mapTo(setLayerViz({ name: 'aptParcel', viz: 'visible' })),
    // check map after all actions dispatched
  )),
);

const setModeQueryMinusEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(STEP_MINUS)
.pipe(
  filter(() => store.getState().map.step === 1),
  map(() => removeMapControl('draw')),
  tap(() => console.log('draw removed')),
  switchMap(val => Observable.concat(
    // actions: check map -> set layer viz(-> check map)
    Observable.of(setStyle('light')),
    // set layer viz after set style,
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
    .take(1)
    .mapTo(setLayerViz({ name: 'vacantParcel', viz: 'visible' })),
    // set layer viz after set style,
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
    .take(1)
    .mapTo(setLayerViz({ name: 'aptParcel', viz: 'visible' })),
    // check map after all actions dispatched
  )),
);

const setLayerVizEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(LAYER_VIZ_SET)
.do(val => console.log(val, 'viz set'))
.pipe(
  // mergeMap(() => Observable.empty<never>()),
  switchMap((action: any) => Observable.of(mapping)
    .do(() =>
    // check layer
    mapping.getLayer(action.payload.name)
    // check layer viz
    && (mapping.getLayer(action.payload.name) as any).visibility !== action.payload.viz
    && mapping.setLayoutProperty(action.payload.name, 'visibility', action.payload.viz))
    .switchMap(() => Observable.of(
      race(
        // check the map if loaded
        Observable.of(mapping).filter(val => val.isStyleLoaded() === true),
        // (if not), wait for data loading event
        Observable.fromEvent(mapping, 'data')
        .distinctUntilChanged()
        .filter((ev: mapboxgl.MapDataEvent) => ev.dataType === 'source' && ev.isSourceLoaded === true)
        .do(val => console.log(val))
        .take(1),
      ),
    ))
    .mapTo(mapLoaded(true)),
  ),
);

// const setStyleEpic = (action$: ActionsObservable<Action>) => action$
// .ofType(STYLE_SET)
// .pipe(
//   switchMap(
//     // subscribe to map loaded event
//     // () => action$
//     //   .ofType(IS_LOADED)
//     //   .filter((action: any) => action.payload === true),
//     () => of(mapping),
//     (setStyle: Action & {payload: string}, _) => {
//       if (mapping.getStyle().name !== setStyle.payload) {
//         console.log('style change');
//         mapping.setStyle((MAP_STYLES as any)[setStyle.payload]);
//       }
//       return checkMap(mapping);
//     },
//   ),
// );

interface MapboxDrawEvent extends Event {
  features: GeoJSON.Feature<mapboxgl.GeoJSONGeometry>[];
}

const setModeMeasureEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(STEP_ADD)
.pipe(
  filter(() => store.getState().map.step === 2),
  tap(() => console.log('step is 2')),
  map(() => {
    addMapControl('draw');
    return mapping;
  }),
  switchMap(val => Observable.concat(
    // actions: check map -> set layer viz(-> check map)
    Observable.of(setLayerViz({ name: 'vacantParcel', viz: 'visible' })),
    // set layer viz after set style,
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
    .take(1)
    .mapTo(setLayerViz({ name: 'aptParcel', viz: 'none' })),

    // Observable.fromEvent(mapping, 'draw.selectionchange')
    // .map((ev: MapboxDrawEvent) => setGeometry(ev.features)),
  )),
);

const listenDrawDeleteEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(STEP_ADD, STEP_MINUS)
.filter(() => store.getState().map.step === 2)
.map(() => mapping)
.switchMap(val => Observable
  .fromEvent(val, 'draw.delete')
  .map((ev: MapboxDrawEvent) => removeGeometry(ev.features)),
);

const listenDrawSelectEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
.ofType(STEP_ADD, STEP_MINUS)
.filter(() => store.getState().map.step === 2)
.map(() => mapping)
.switchMap(val => Observable
  .fromEvent(val, 'draw.selectionchange')
  .map((ev: MapboxDrawEvent) => setGeometry(ev.features)),
);

const setModeMeasureMinusEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
  .ofType(STEP_MINUS)
  .pipe(
    filter(() => store.getState().map.step === 2),
    tap(() => console.log('step is 2 minus')),
    map(() => {
      // add drawing control
      addMapControl('draw');
      mapping.easeTo({
        ...MAP_CAMERA.plane,
      });
      if (/light/i.test(mapping.getStyle().name)) {
        mapping.setStyle(MAP_STYLES.light);
      }
      return mapping;
      // if (mapping.getLayer('blueprint')) {
      //   mapping.removeLayer('blueprint');
      //   mapping.removeSource('blueprint');
      // }
      // return setLayerViz({ name: 'aptParcel', viz: 'none' });
    }),
    switchMap(() => Observable.concat(
      Observable.fromEvent(mapping, 'data')
      .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
      .take(1)
      .do(() => {
        if (mapping.getLayer('blueprint')) {
          mapping.removeLayer('blueprint');
          mapping.removeSource('blueprint');
        }
      })
      .mapTo(setStyle('light')),
      Observable.of(mapLoaded(true)),
    )),
);

// const drawCreateEventEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
// .ofType(STEP_ADD, STEP_MINUS)
// .pipe(
//   filter(() => (store.getState().map.step === 2)),
//   switchMap(
//     // fire when map loaded
//     () => action$.ofType(IS_LOADED).filter((action: any) => action.payload === true)
//     .pipe(
//       switchMap(() => Observable
//         .fromEvent(mapping, 'draw.create')
//         .map((ev: MapboxDrawEvent) => setGeometry(ev.features)),
//       ),
//     ),
//   ),
// );

// const setGeometryEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
// .ofType(GEOMETRY_SET)
// .pipe(
//   // tap(() => {
//   //   console.log('check source', mapping.getSource('blueprint'));
//   // // add source for the first time
//   //   if (!mapping.getSource('blueprint')) {
//   //     return mapping.addSource('blueprint', {
//   //       type: 'geojson',
//   //       data: blueprintSrcFromStore(store),
//   //     });
//   //   }
//   // // modify data frome 2nd time
//   //   return (mapping.getSource('blueprint') as mapboxgl.GeoJSONSource).setData(blueprintSrcFromStore(store));
//   // }),
//   tap(val => console.log(val, 'check source')),
//   mapTo({ type: 'check source complete' }),
// );

const setModeBuildEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(STEP_ADD)
.pipe(
  filter(() => store.getState().map.step === 3),
  tap(() => console.log('step is 3')),
  map(() => {
    removeMapControl('draw');
    mapping.easeTo({
      ...MAP_CAMERA.perspective,
    });
    if (!/customized/i.test(mapping.getStyle().name)) {
      mapping.setStyle(MAP_STYLES.customized);
    }
    return mapping;
  }),
  switchMap(val => Observable.concat(
    Observable.of(setStyle('customized')),
    Observable.fromEvent(val, 'data')
    .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
    .take(1)
    .do(() => {
      console.log('add source', blueprintSrcFromStore(store));

      if (!mapping.getSource('blueprint')) {
        mapping.addSource('blueprint', {
          type: 'geojson',
          data: blueprintSrcFromStore(store),
        });
      }
      // prepare layer data
      const blueprintSrc = blueprintSrcFromStore(store);
      (mapping.getSource('blueprint') as mapboxgl.GeoJSONSource).setData(blueprintSrc);
      const blueprintCenter = center(blueprintSrc).geometry.coordinates;
      mapping.addLayer(blueprintLyr);
      mapping.easeTo({
        center: blueprintCenter,
      });
    })
    .switchMap(() => Observable.concat(
      Observable.of(setLayerViz({ name: 'footprint', viz: 'none' })),
      Observable.of(setLayerViz({ name: 'blueprint', viz: 'visible' })),
      // set a default height after set layer
      Observable.of(setGeometryHeight(500)),

    )),
    // .mapTo(setLayerViz({ name: 'footprint', viz: 'none' })),
  )),
);

const setModeBuildMinusEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(STEP_MINUS)
.pipe(
  filter(() => store.getState().map.step === 3),
  mapTo(setLayerViz({ name: 'footprint', viz: 'none' })),
    // Observable.of(checkMap(mapping)),
  // map(() => {
  //   const isFootprintViz = mapping.getLayoutProperty('footprint', 'visibility') === 'visible';
  //   if (!isFootprintViz) {
  //     mapping.setLayoutProperty('footprint', 'visibility', 'visible');
  //   }
  //   return checkMap(mapping);
  // }),
);

const setModeDecideEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(STEP_ADD, STEP_MINUS)
.pipe(
  filter(() => store.getState().map.step === 4),
  switchMap(val => Observable.concat(
    Observable.of(mapLoaded(true)),
    Observable.of(setLayerViz({ name: 'footprint', viz: 'visible' })),
  )),
    // Observable.of(checkMap(mapping)),
  // map(() => {
  //   const isFootprintViz = mapping.getLayoutProperty('footprint', 'visibility') === 'visible';
  //   if (!isFootprintViz) {
  //     mapping.setLayoutProperty('footprint', 'visibility', 'visible');
  //   }
  //   return checkMap(mapping);
  // }),
);

// const checkMapEpic = (action$: ActionsObservable<Action & {payload: mapboxgl.Map}>, store: Store) => action$
// .ofType(MAP_CHECK)
// .do(_ => console.log('check map'))
// // .debounceTime(1000)
// .filter(() => store.getState().map.loaded === false)
// .do(val => console.log('loaded false check map'))

// .pipe(
//   // check for map style loading
//   switchMap(
//     // create observable to observe 'load' event
//     ({ payload }) => (fromEvent(payload, 'data').debounceTime(1000) as Observable<mapboxgl.MapDataEvent>)
//     .pipe(
//       tap(ev => console.log(ev, 'check if there is ')),

//       // return action when has no outstanding network request
//       // filter(ev => ev.dataType === 'style'),
//       // distinctUntilChanged(),
//       tap(ev => console.log(ev)),
//       switchMap(() => Observable.of(mapping).filter(val => val.isStyleLoaded() === true)
//       .do(ev => console.log('check complete'))
//       .mapTo(mapLoaded(true))),
//       // mapTo(mapLoaded(true)),
//     ),
//   ),

  //   .filter(val => val.dataType === 'source' && val.isSourceLoaded)
  //   (action, obs$) => {
  //     console.log(obs$, 'check data');

  //     console.log(mapping.isStyleLoaded(), obs$.isSourceLoaded, 'check data');
  //     return mapLoaded(true);
  //   },
  // ),
// );

const setGeometryHeightEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(GEOMETRY_HEIGHT_SET)
// when mode is build, listen to the event
.takeWhile(() => store.getState().map.step === 3)
.pipe(
  tap(() => {
    console.log('get height');
    // set blueprint source data
    (mapping.getSource('blueprint') as mapboxgl.GeoJSONSource).setData(blueprintSrcFromStore(store));
  }),
  switchMapTo(Observable.empty<never>()),
);

const getGeometryEpic = (action$: ActionsObservable<Action>) => action$
.ofType(GEOMETRY_GET)
.pipe(
  map(() => {
    // get all draws as feature collection on the map
    const data: FeatureCollection<GeometryObject> = drawControl.getAll();
    return setGeometry(data.features);
  }),
);

// template to dispatch multiple actions in order
// const testEpic = (action$: ActionsObservable<Action>) => action$
// .ofType('TEST')
// .do(val => console.log(val))
// .switchMap(
//   () => Observable.concat(
//     Observable.of({ type: 'tesfdsafsat' }),
//     Observable.of({ type: 'bbldfsa' }),
//   ),
// );

export const epics = combineEpics(
  // testEpic,
  initMapEpic,
  enterAppEpic,
  resetMapEpic,

  setModeIntroEpic,
  setModeIntroMinusEpic,

  setModeQueryEpic,
  setModeQueryMinusEpic,

  setModeMeasureEpic,
  setModeMeasureMinusEpic,

  setModeBuildEpic,
  setModeBuildMinusEpic,

  // setGeometryEpic,
  setModeDecideEpic,

  setLayerVizEpic,
  // setStyleEpic,

  setGeometryHeightEpic,
  listenDrawDeleteEpic,
  listenDrawSelectEpic,
  // drawCreateEventEpic,
  // getGeometryEpic,
  // checkMapEpic,
);

export default epics;
