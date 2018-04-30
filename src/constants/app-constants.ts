import { MapboxOptions } from 'mapbox-gl';

export const MAP_CAMERA = {
  perspective: {
    pitch: 65,
    // zoom: 14,
    // center: [-75.1639, 39.9522],
    bearing: 9.2,
  },
  plane: {
    pitch: 0,
    bearing: 0,
  },
};

export const MAP_STYLES = {
  customized: 'mapbox://styles/yunshi/cizrdgy3c00162rlr64v8jzgy?',
  satellite: 'mapbox://styles/yunshi/cj0u96uwe009w2rqryu8r7bg8?',
  light: 'mapbox://styles/yunshi/cj0u990c700fm2smr7yvnv1c5?',
};

export const MAP_SETTINGS_DEFAULT: MapboxOptions = {
  ...MAP_CAMERA.perspective,
  zoom: 14,
  center: [-75.1639, 39.9522],
  style: MAP_STYLES.customized,
  maxBounds: [[-75.3324037, 39.824024], [-74.9240231, 40.1551322]],
};

export const MAPBOX_TOKEN = 'pk.eyJ1IjoieXVuc2hpIiwiYSI6ImNpeHczcjA3ZDAwMTMyd3Btb3Fzd3hpODIifQ.SWiqUD9o_DkHZuJBPIEHPA';

export const GOOGLE_TOKEN = 'AIzaSyACCPPFvX0caIW52AJVWIksLZHEFrJZEpU';
export const ZILLOW_TOKEN = 'X1-ZWz19df6l3etqj_64j9s';

const FIREBASE_SERVER = 'https://smartselect-34c02.firebaseio.com';

export const DATA_URL = {
  slider: `${FIREBASE_SERVER}/slider.json`,
};
