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

export const LEGEND_PALETTE = new Map([
  [69100, '#0C2C84'],
  [94200, '#225ea8'],
  [119000, '#1d91c0'],
  [141167, '#41b6c4'],
  [166690, '#7fcdbb'],
  [191400, '#febe12'],
  [225682, '#ee836e'],
  [285000, '#e85c41'],
  [386940, '#db3a1b'],
  [600000, '#aa2d17'],
]);

export const LEGEND_PALETTE_RGB = new Map([
  [69100, 'rgb(12, 44, 132)'],
  [94200, 'rgb(34, 94, 168)'],
  [119000, 'rgb(29, 145, 192)'],
  [141167, 'rgb(65, 182, 196)'],
  [166690, 'rgb(127, 205, 187)'],
  [191400, 'rgb(254, 190, 18)'],
  [225682, 'rgb(238, 131, 110)'],
  [285000, 'rgb(232, 92, 65)'],
  [386940, 'rgb(219, 58, 27)'],
  [600000, 'rgb(170, 45, 23)']],
);

export const getLegendColor = (datum: number) => {
  const keys = Array.from(LEGEND_PALETTE.keys());
  const color = LEGEND_PALETTE.get(keys.find(item => Number(datum) <= item));
  // console.log(color, 'color');
  return color;
};
export const MAPBOX_TOKEN = 'pk.eyJ1IjoieXVuc2hpIiwiYSI6ImNpeHczcjA3ZDAwMTMyd3Btb3Fzd3hpODIifQ.SWiqUD9o_DkHZuJBPIEHPA';

export const GOOGLE_TOKEN = 'AIzaSyACCPPFvX0caIW52AJVWIksLZHEFrJZEpU';
export const ZILLOW_TOKEN = 'X1-ZWz19df6l3etqj_64j9s';

const FIREBASE_SERVER = 'https://smartselect-34c02.firebaseio.com';
const ZILLOW_SERVER = `${process.env.NODE_ENV === 'production'
  ? 'https://'
  : 'https://cors-anywhere.herokuapp.com/'}www.zillow.com/webservice/GetDeepComps.htm`;

export const DATA_URL = {
  firebase: `${FIREBASE_SERVER}/slider.json`,
  zillow: `${ZILLOW_SERVER}`,
};

export const DIRECTIONS_API = 'https://api.mapbox.com/directions/v5/mapbox';

export const getZillowComps = (zpid: string) =>
  `${DATA_URL.zillow}?zws-id=${ZILLOW_TOKEN}&zpid=${zpid}&count=3`;

/**
 *
 * @param profile Route profiles for Mapbox Direction API
 * @param origin Origin coordinates {longitude},{latitude}
 * @param dest Destination coordinates {longitude},{latitude}
 */
export const getDirections = (profile: string, origin: {lat: number; lng: number}, dest: {lat: number; lng: number}) =>
  `${DIRECTIONS_API}/${profile}/${origin.lng},${origin.lat};${dest.lng},${dest.lat}?access_token=${MAPBOX_TOKEN}`;
