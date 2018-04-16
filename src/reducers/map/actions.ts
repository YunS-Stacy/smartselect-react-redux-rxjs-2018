import {
  MAP_SET, MAP_INIT, INSTANCE_SET, IS_LOADED, MAP_RESET, LAYER_SET, MODE_SET
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
