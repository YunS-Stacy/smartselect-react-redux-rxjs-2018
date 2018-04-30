import {
  MAP_SET, MAP_CHECK, MAP_INIT, MAP_RESET, INSTANCE_SET,
  IS_LOADED, LAYER_SET, MODE_SET,
  STEP_SET, STEP_MINUS, STEP_ADD,
  GEOMETRY_GET, GEOMETRY_SET,
  LAYER_VIZ_SET, LAYER_ADD, LAYER_REMOVE, STYLE_SET, GEOMETRY_HEIGHT_SET, GEOMETRY_REMOVE,
} from '../../constants/action-types';

export const checkMap = (payload: mapboxgl.Map) => ({
  payload,
  type: MAP_CHECK,
});

export const setMap = (payload: string) => ({
  payload,
  type: MAP_SET,
});

export const initMap = (payload: HTMLDivElement) => ({
  payload,
  type: MAP_INIT,
});

export const setInstance = (payload: any) => ({
  payload,
  type: INSTANCE_SET,
});

export const mapLoaded = (payload?: boolean) => ({
  payload,
  type: IS_LOADED,
});

export const resetMap = () => ({ type: MAP_RESET });

export const setLayer = (name: string, viz: string) => ({
  type: LAYER_SET,
  payload: { name, viz },
});

export const setMode = (payload: string) => ({
  payload,
  type: MODE_SET,
});

export const setStep = (payload: number) => ({
  payload,
  type: STEP_SET,
});

export const addStep = () => ({
  type: STEP_ADD,
});

export const minusStep = () => ({
  type: STEP_MINUS,
});

export const getGeometry = () => ({
  type: GEOMETRY_GET,
});

export const setGeometry = (payload: any) => ({
  payload,
  type: GEOMETRY_SET,
});

export const removeGeometry = (payload: any) => ({
  payload,
  type: GEOMETRY_REMOVE,
});

export const setGeometryHeight = (payload: number) => ({
  payload,
  type: GEOMETRY_HEIGHT_SET,
});

export const setStyle = (payload: string) => ({
  payload,
  type: STYLE_SET,
});

export const setLayerViz = (payload: {name: string; viz: string}) => ({
  payload,
  type: LAYER_VIZ_SET,
});

export const addLayer = (payload: {name: string; viz: string}) => ({
  payload,
  type: LAYER_ADD,
});

export const removeLayer = (payload: {name: string; viz: string}) => ({
  payload,
  type: LAYER_REMOVE,
});
