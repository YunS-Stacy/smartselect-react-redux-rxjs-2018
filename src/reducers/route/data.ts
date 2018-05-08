import { ROUTE_SET, MAP_RESET, MARKER_RESET, DATA_FETCH_FULFILLED } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';
import { multiPoint, lineString } from '@turf/helpers';
import * as polyline from '@mapbox/polyline';
import { LineString } from 'geojson';
const initialState: RootState['route']['data'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case DATA_FETCH_FULFILLED:
      if (payload.name === 'route') {
        console.log('data', payload.data, polyline.toGeoJSON(payload.data));
        const data: LineString = polyline.toGeoJSON(payload.data);
        const pts: number[][] = data.coordinates;
        return ({
          line: lineString((polyline.toGeoJSON(payload.data) as LineString).coordinates),
          pts: multiPoint([pts[0], pts[pts.length - 1]]),
        });
      }
      return payload;
    case MAP_RESET:
    case MARKER_RESET:
      return initialState;
    default:
      return state;
  }
};
