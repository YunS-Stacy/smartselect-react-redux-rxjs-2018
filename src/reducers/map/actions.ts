import { MAP_SET, MAP_INIT, INSTANCE_SET, IS_LOADED } from '../../constants/action-types';

export const setMap = (payload: string) => ({
  payload,
  type: MAP_SET,
});

export const initMap = (payload: HTMLDivElement) => ({
  payload,
  type: MAP_INIT,
});

export const setInstance = (payload: mapboxgl.Map) => ({
  payload,
  type: INSTANCE_SET,
});

export const mapLoaded = () => ({
  type: IS_LOADED,
});
