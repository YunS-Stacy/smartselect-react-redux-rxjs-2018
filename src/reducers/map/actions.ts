import {
  MAP_SET, MAP_INIT, MAP_RESET, INSTANCE_SET,
  IS_LOADED, LAYER_SET, MODE_SET,
  STEP_SET, STEP_MINUS, STEP_ADD,
  GEOMETRY_GET, GEOMETRY_SET,
} from '../../constants/action-types';

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
