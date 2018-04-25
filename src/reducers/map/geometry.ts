import length from '@turf/length';
import polygonToLine from '@turf/polygon-to-line';
import area from '@turf/area';

import { STEP_SET, MAP_RESET, STEP_ADD, STEP_MINUS, GEOMETRY_GET, GEOMETRY_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: Map<string, GeoJSON.Feature<mapboxgl.GeoJSONGeometry>[]> = new Map();

export default (state = initialState, { type, payload }: Action & {
  payload?: GeoJSON.Feature<mapboxgl.GeoJSONGeometry>[];
}) => {
  switch (type) {
    case GEOMETRY_SET:

      // // get the numbers of drawings, if any
      // const num: number = data && data.features.length;
      // // filter line features, if any
      // const lines: Feature<LineString>[] = data.features
      //   .filter(datum => datum && datum.geometry.type === 'LineString');
      // // get the last line
      // const line = lines && lines[lines.length - 1];
      // // convert unit to miles
      // const lineLength = length(line, { units: 'miles' });
      // // filter polygon features, if any
      // const polygons: Feature<Polygon>[] = data.features
      //   .filter(datum => datum && datum.geometry.type === 'Polygon');
      // // get the last polygon
      // const polygon = polygons && polygons[polygons.length - 1];
      // // convert unit to miles
      // const polyLength = length(polygonToLine(polygon), { units: 'miles' });
      // // convert area from square meters to square feet
      // const polyArea = area(polygon) * 10.7639;
      // console.log({
      //   num,
      //   line: { length: lineLength },
      //   polygon: { length: polyLength, area: polyArea },
      // });

      // const results = {
      //   num,
      //   line: { length: lineLength },
      //   polygon: { length: polyLength, area: polyArea },
      // };
      const newState = new Map();
      payload.forEach((each) => {
        switch (each.geometry.type) {
          case 'Polygon':
          // convert unit to miles
            const polyLength = length(polygonToLine(each), { units: 'feet' });
          // convert area from square meters to square feet
            const polyArea = area(each) * 10.7639;
            return newState.set('polygon',
            [{ ...each, properties: { length: polyLength, area: polyArea, height: 0 } }]);
          case 'LineString':
            const lineLength = length(each, { units: 'feet' });
            return newState.set('line', [{ ...each, properties: { length: lineLength } }]);

          default:
            break;
        }
      });
      // filter null value
      return newState;
    default:
      return state;
  }
};
