import { combineEpics, ActionsObservable, EPIC_END } from 'redux-observable';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import center from '@turf/center';
import bbox from '@turf/bbox';
import { featureCollection, lineString, point } from '@turf/helpers';

import { Observable } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { _throw } from 'rxjs/observable/throw';
import {
  race,
  filter,
  map,
  mapTo,
  mergeMap,
  tap,
  switchMap,
  switchMapTo,
} from 'rxjs/operators';

import {
  APP_TOGGLE,
  MAP_INIT, IS_LOADED,
  INSTANCE_SET, MODE_SET, MAP_RESET, MAP_CHECK,
  GEOMETRY_GET, GEOMETRY_SET,
  STEP_ADD, STEP_MINUS, STEP_SET, LAYER_VIZ_SET,
  STYLE_SET, GEOMETRY_HEIGHT_SET, SLIDER_RANGE_SET, DATA_FETCH_FULFILLED, MARKER_SET, POPUP_FETCH, POPUP_ID_SET,
} from '../constants/action-types';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';
import {
  setInstance, mapLoaded, checkMap, resetMap,
  setLayer, setMode, setGeometry, setStep, setLayerViz, setStyle, setGeometryHeight, removeGeometry, resetGeometry
} from '../reducers/map/actions';
import { MAPBOX_TOKEN, MAP_SETTINGS_DEFAULT, MAP_CAMERA, MAP_STYLES } from '../constants/app-constants';
import { FeatureCollection, Feature, GeometryObject, LineString, Polygon, Point, GeoJsonObject } from 'geojson';
import { setPopupId, setPopupPosition, resetPopupId } from '../reducers/popup/actions';
import { setMarker, setMarkerPosition, resetMarker } from '../reducers/marker/actions';
import { RootState } from '../types';

type IAction = Action & { payload?: any };
(mapboxgl as any).accessToken = MAPBOX_TOKEN;

let mapping: mapboxgl.Map;

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

const routeLineLyr: mapboxgl.Layer = {
  id: 'routeLine',
  type: 'line',
  source: 'routeLine',
  paint: {
    'line-color': '#ff5722',
  },
  layout: {
    visibility: 'visible',
  },
};

const routePtsLyr: mapboxgl.Layer = {
  id: 'routePts',
  type: 'circle',
  source: 'routePts',
  paint: {
    'circle-color': '#ff5722',
  },
  layout: {
    visibility: 'visible',
  },
};

const compsLinesLyr: mapboxgl.Layer = {
  id: 'compsLines',
  type: 'line',
  source: 'compsLines',
  paint: {
    'line-color': '#ff9d00',
  },
  layout: {
    visibility: 'visible',
  },
};

const compsPtsLyr: mapboxgl.Layer = {
  id: 'compsPts',
  type: 'circle',
  source: 'compsPts',
  paint: {
    'circle-color': '#ff9d00',
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
  return {
    features,
    type: 'FeatureCollection',
  } as GeoJSON.FeatureCollection<mapboxgl.GeoJSONGeometry>;
};

const hotModuleReplacementEpic = (action$: ActionsObservable<Action>) => action$
  .ofType(EPIC_END).do(() => (window as any).mapping = mapping)
  .mapTo({ type: 'mapping updated' });

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
      // oldChild ? el.replaceChild(container, oldChild) : el.appendChild(container);
      mapping = new mapboxgl.Map({
        ...MAP_SETTINGS_DEFAULT,
        container: el,
      });
      if (process.env.NODE_ENV !== 'production') { (window as any).mapping = mapping; }
      return mapping;
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
      if (!/customized/i.test(mapping.getStyle().name)) {
        mapping.setStyle(MAP_STYLES.customized);
      }
      return mapping;
    }),
  switchMap(val =>
    // map actions
    Observable.concat(
      Observable.concat(
      // reset geometry
      Observable.of(resetGeometry()),
      // actions: check map -> set layer viz(-> check map)
        Observable.of(setStyle('customized')),
        // set layer viz after set style,
        Observable.fromEvent(val, 'data')
          .filter((val: mapboxgl.MapDataEvent) => val.dataType === 'source' && val.isSourceLoaded)
          .take(1)
          .switchMapTo(Observable.from([
            setLayerViz({ name: 'aptParcel', viz: 'none' }),
            setLayerViz({ name: 'vacantParcel', viz: 'none' }),
            setLayerViz({ name: 'footprint', viz: 'visible' }),
          ])),
        ),
      ),
    ),
  );

const enterAppEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(APP_TOGGLE)
  .pipe(
    switchMap(
      () => Observable.of(store.getState().app),
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

const setModeIntroEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(STEP_SET)
.pipe(
  filter(action => store.getState().map.step === 0),
  map(() => {
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
    map(() => mapping.setStyle(MAP_STYLES.customized)),
    switchMap(val => Observable.concat(
      // actions: check map -> set layer viz(-> check map)
      Observable.of(setStyle('customized')),
      // set layer viz after set style,
      // set layer viz after set style,
      Observable.of(setLayerViz({ name: 'vacantParcel', viz: 'none' })),

      Observable.of(setLayerViz({ name: 'aptParcel', viz: 'none' })),

    // check map after all actions dispatched
  )),
);

const setModeQueryEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
  .ofType(STEP_ADD)
  .pipe(
    filter(() => store.getState().map.step === 1),
    map(() => {
      if (!/light/i.test(mapping.getStyle().name)) {
        mapping.setStyle(MAP_STYLES.light);
      }
      return mapping;
    }),
  switchMap(val =>
    // map actions
    Observable.concat(
      Observable.concat(
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
          .take(1)
          .mapTo(setLayerViz({ name: 'aptParcel', viz: 'visible' })),
      ), // check map after all actions dispatched

      // map events
      Observable.fromEvent(mapping, 'mousemove')
        .filter(() => store.getState().map.step === 1)
        .map((ev: mapboxgl.MapDataEvent) => {
          const feature = mapping.queryRenderedFeatures((ev as any).point, { layers: ['aptParcel'] });
          // change cursor style
          mapping.getCanvas().style.cursor = feature.length > 0 ? 'pointer' : '';

          if (feature.length > 0) {
            return { feature: feature[0], position: (ev as any).point };
          }
          return null;
        })
        // filter null value
        .filter(val => !!val)
        .map(val => setMarker({ ...val.feature.properties, position: val.position })),
      // check map after all actions dispatched
    ),
  ),
);

const setModeQueryMinusEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
  .ofType(STEP_MINUS)
  .pipe(
    filter(() => store.getState().map.step === 1),
    map(() => removeMapControl('draw')),
    switchMap(val =>
      Observable.concat(
        // actions: check map -> set layer viz(-> check map)
        // set layer viz after set style,
        Observable.fromEvent(val, 'data')
          // wait the control to be removed
          .filter((val: mapboxgl.MapDataEvent) => val.dataType === 'style')
          .take(1)
          .mapTo(setLayerViz({ name: 'aptParcel', viz: 'visible' })),
        Observable.fromEvent(mapping, 'mousemove')
          .filter(() => store.getState().map.step === 1)
          .map((ev: mapboxgl.MapDataEvent) => {
            const feature = mapping.queryRenderedFeatures((ev as any).point, { layers: ['aptParcel'] });
            // change cursor style
            mapping.getCanvas().style.cursor = feature.length > 0 ? 'pointer' : '';

            if (feature.length > 0) {
              return { feature: feature[0], position: (ev as any).point };
            }
            return null;
          })
          // filter null value
          .filter(val => !!val)
          .map(val => setMarker({ ...val.feature.properties, position: val.position })),
        ),
    ),
  );

const setLayerVizEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(LAYER_VIZ_SET)
    // mergeMap(() => Observable.empty<never>()),
  .switchMap((action: any) =>
    Observable.of(mapping)
      .map(() => {
        // check layer
        const newMapping = mapping.getLayer(action.payload.name)
          // check layer viz
          && (mapping.getLayer(action.payload.name) as any).visibility !== action.payload.viz
          && mapping.setLayoutProperty(action.payload.name, 'visibility', action.payload.viz);
        // check if layer exists, if no layer exists, then return original map
        return newMapping || mapping;
      })
      .switchMap(val =>
        Observable.fromEvent(val, 'data')
        .distinctUntilChanged()
        .filter((ev: mapboxgl.MapDataEvent) => ev.dataType === 'source' && ev.isSourceLoaded === true)
        .take(1)
        .mapTo(mapLoaded(true)),

      ),
  // .mapTo(mapLoaded(true)),
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
    .filter(() => store.getState().map.step === 2)
    .map((ev: MapboxDrawEvent) => setGeometry(ev.features)),
);

const setModeMeasureMinusEpic = (action$: ActionsObservable<Action & { payload: string }>, store: Store) => action$
  .ofType(STEP_MINUS)
  .pipe(
  filter(() => store.getState().map.step === 2),
    map(() => {
      // add drawing control
      addMapControl('draw');
      mapping.easeTo({
        ...MAP_CAMERA.plane,
      });
      // test if not the 'light' style
      if (!/light/i.test(mapping.getStyle().name)) {
        mapping.setStyle(MAP_STYLES.light);
      }
      return mapping;
    }),
    switchMap((val: mapboxgl.Map) =>
      Observable.fromEvent(val, 'data')
        .filter((val: mapboxgl.MapDataEvent) => val.isSourceLoaded === true)
        .take(1)
        // .do(() => {
        //   if (mapping.getLayer('blueprint')) {
        //     mapping.removeLayer('blueprint');
        //     mapping.removeSource('blueprint');
        //   }
        // })
        .switchMapTo(
          Observable.concat(
            // reset geometry
            Observable.of(resetGeometry()),
            Observable.of(setStyle('light')),
            Observable.of(setLayerViz({ name: 'aptParcel', viz: 'none' })),
            Observable.of(setLayerViz({ name: 'vacantParcel', viz: 'visible' })),
          ),
        ),
    ),
);

const setModeBuildEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(STEP_ADD)
.pipe(
  filter(() => store.getState().map.step === 3),
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
);

const setGeometryHeightEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(GEOMETRY_HEIGHT_SET)
  // when mode is build, listen to the event
  .takeWhile(() => store.getState().map.step === 3)
  .pipe(
  // set blueprint source data
  tap(() => (mapping.getSource('blueprint') as mapboxgl.GeoJSONSource).setData(blueprintSrcFromStore(store))),
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

// query map when aptParcel layer exists and set the slider range
const setSliderRangeEpic = (action$: ActionsObservable<Action>) => action$
  .ofType(SLIDER_RANGE_SET)
  .pipe(
    // check layer exists and set filter
    tap(action => mapping.getLayer('aptParcel') && mapping.setFilter(
        'aptParcel',
      [
        'all',
          ['>=', 'refprice', (action as any).payload[0]], ['<=', 'refprice', (action as any).payload[1]],
      ],
    )),
    mergeMap(() => Observable.empty<never>()),
);

// clear layer filter
const resetSliderRangeEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(STEP_ADD, STEP_MINUS)
  .filter(() => store.getState().map.step === 0 || store.getState().map.step === 2)
  .pipe(
    // check layer exists and set filter
    tap(action => mapping.getLayer('aptParcel') && mapping.setFilter(
      'aptParcel',
      null,
    )),
    mergeMap(() => Observable.empty<never>()),
);

const setCompsLayerEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  // when get cops data
  .ofType(POPUP_FETCH)
  .switchMapTo(
  action$.ofType(DATA_FETCH_FULFILLED).filter(action => (action as any).payload.name === 'popup')
    // relates to comps
    // .filter(action => (action as any).payload.name === 'popup')
    // get comps data from store
    .map(() => {
      // prepare layer source
      const comps: RootState['popup']['data'] = store.getState().popup.data;
      // get origin parcel position
      const { marker: { coords: { lng: originLng, lat: originLat } } } = store.getState();
      const originCoords = [originLng, originLat];
      // set geometry and attrs for property query
      const compsPts = featureCollection(comps.map(({ coords: { lng, lat }, zpid }) => point([lng, lat], { zpid })));
      const compsLines = featureCollection(
        comps.map(({ coords: { lng, lat } }) => lineString([[lng, lat], originCoords])),
      );
      // check if exits source, if has source, set data; otherwise, set source and data
      if (mapping.getSource('compsPts')) {
        (mapping.getSource('compsPts') as mapboxgl.GeoJSONSource).setData(compsPts);
      } else {
        mapping.addSource('compsPts', { type: 'geojson', data: compsPts });
      }
      if (mapping.getSource('compsLines')) {
        (mapping.getSource('compsLines') as mapboxgl.GeoJSONSource).setData(compsLines);
      } else {
        mapping.addSource('compsLines', { type: 'geojson', data: compsLines });
      }

      if (!mapping.getLayer('compsLines')) {
        mapping.addLayer(compsLinesLyr);
      }

      if (!mapping.getLayer('compsPts')) {
        mapping.addLayer(compsPtsLyr);
      }

      // calculate bbox, and set fints to that
      const mapBbox = bbox(compsLines);
      mapping.fitBounds((mapBbox as any), { padding: 100 });
      return mapping;
    })
    .switchMap(val =>
      Observable.fromEvent(val, 'mousemove')
        .filter(() => store.getState().map.step === 1 && !!mapping.getLayer('compsPts'))
        .map((ev: mapboxgl.MapDataEvent) => {
        // safe check
          const feature = mapping.queryRenderedFeatures((ev as any).point, { layers: ['compsPts'] });
          // change cursor style
          mapping.getCanvas().style.cursor = feature.length > 0 ? 'pointer' : '';
          return feature.length > 0 && feature[0].properties.zpid;
        })
        .distinctUntilChanged()
        // if has feature set id, else reset
        .map((val) => {
          if (!val) {
            return resetPopupId();
          }
          return setPopupId(val);
        })
        .takeUntil(action$.ofType(MARKER_SET)),
    ),
);

const setRouteLayerEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  // when get cops data
  .ofType(POPUP_FETCH)
  .switchMapTo(
    action$.ofType(DATA_FETCH_FULFILLED).filter(action => (action as any).payload.name === 'route')
      // relates to comps
      // .filter(action => (action as any).payload.name === 'popup')
      // get comps data from store
      .do(() => {
        // prepare layer source
        const routeLine: Feature<mapboxgl.GeoJSONGeometry> = store.getState().route.data.line;
        // get origin and dest coords
        const routePts: Feature<mapboxgl.GeoJSONGeometry> = store.getState().route.data.pts;

        if (mapping.getSource('routeLine')) {
          (mapping.getSource('routeLine') as mapboxgl.GeoJSONSource).setData(routeLine);
        } else {
          mapping.addSource('routeLine', { type: 'geojson', data: routeLine });
        }

        if (!mapping.getLayer('routeLine')) {
          mapping.addLayer(routeLineLyr);
        }

        if (mapping.getSource('routePts')) {
          (mapping.getSource('routePts') as mapboxgl.GeoJSONSource).setData(routePts);
        } else {
          mapping.addSource('routePts', { type: 'geojson', data: routePts });
        }

        if (!mapping.getLayer('routePts')) {
          mapping.addLayer(routePtsLyr);
        }
        // calculate bbox, and set fints to that
        const mapBbox = bbox(routeLine);
        mapping.fitBounds((mapBbox as any), { padding: 100 });
      })
      .switchMapTo(Observable.empty<never>()),
);

// after set popup id
const setPopupPositionEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(POPUP_ID_SET)
// init popup position
.map((action: any) => {
  // get zpid
  const { payload: id } = action;
  // find data and get coords
  const selected = store.getState().popup.data.find((item: any) => item.zpid === id);

  const { coords } = store.getState().popup.data.find((item: any) => item.zpid === id);
  return setPopupPosition(mapping.project(coords));
});

const setMarkerEpic = (action$: ActionsObservable<Action>, store: Store) => action$
  .ofType(MARKER_SET)
  .do(() => ['compsLines', 'compsPts', 'routeLine', 'routePts'].forEach((name: string) =>
    mapping.getLayer(name) && mapping.removeLayer(name)),
)
  .mergeMapTo(Observable.empty<never>());

const mappingEventsEpic = (action$: ActionsObservable<Action>, store: Store) => action$
.ofType(IS_LOADED).take(1).switchMap(() =>
  Observable.fromEvent(mapping, 'move')
  // listen to event when map mode is query
  .filter(() => store.getState().map.step === 1)
  .switchMapTo(
    Observable.merge(
      // set marker position
      Observable.of(1)
      .filter(() => store.getState().marker)
      .map(() => setMarkerPosition(mapping.project(store.getState().marker.coords))),
      // set popup position
      Observable.of(1)
      .filter(() => store.getState().popup.id)
      .map(() => {
        const { id } = store.getState().popup;
        const selected = store.getState().popup.data.find((item: any) => item.zpid === id);
        const { coords } = store.getState().popup.data.find((item: any) => item.zpid === id);
        return setPopupPosition(mapping.project(coords));
      }),
    ),
  ),
);

export const epics = combineEpics(
  // testEpic,
  initMapEpic,
  enterAppEpic,
  resetMapEpic,

  setMarkerEpic,

  setModeIntroEpic,
  setModeIntroMinusEpic,

  setModeQueryEpic,
  setModeQueryMinusEpic,

  setModeMeasureEpic,
  setModeMeasureMinusEpic,

  setModeBuildEpic,
  setModeBuildMinusEpic,

  setModeDecideEpic,

  setLayerVizEpic,
  // setStyleEpic,

  setGeometryHeightEpic,
  listenDrawDeleteEpic,
  listenDrawSelectEpic,

  setSliderRangeEpic,
  resetSliderRangeEpic,
  setCompsLayerEpic,
  setRouteLayerEpic,
  setPopupPositionEpic,
  mappingEventsEpic,
  hotModuleReplacementEpic,

  setMarkerEpic,
);

export default epics;
