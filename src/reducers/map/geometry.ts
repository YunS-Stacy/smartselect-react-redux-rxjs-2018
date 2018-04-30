import length from '@turf/length';
import polygonToLine from '@turf/polygon-to-line';
import area from '@turf/area';

import {
  STEP_SET, MAP_RESET, STEP_ADD, STEP_MINUS,
  GEOMETRY_GET, GEOMETRY_SET, GEOMETRY_HEIGHT_SET, GEOMETRY_REMOVE,
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['geometry'] = [];

export default (state = initialState, { type, payload }: Action & {
  payload?: any;
}) => {
  switch (type) {
    case GEOMETRY_SET:
      return payload.map((each: any) => {
        switch (each.geometry.type) {
          case 'Polygon': {
          // convert unit to miles
            const polyLength = length(polygonToLine(each), { units: 'feet' });
          // convert area from square meters to square feet
            const polyArea = area(each) * 10.7639;
            return {
              ...each,
              properties: { length: polyLength, area: polyArea, height: 0 },
            };
          }
          case 'LineString': {
            const lineLength = length(each, { units: 'feet' });
            return {
              ...each,
              properties: { length: lineLength },
            };
          }
          default:
            break;
        }
      });
    case GEOMETRY_REMOVE: {
      const removeIds = payload.map((item: any) => item.id);
      let newState;
      removeIds.forEach((id: string) => {
        newState = state.filter(item => item.id !== id);
      });
      return newState;
    }
    case GEOMETRY_HEIGHT_SET:
      return state.map((item) => {
        if (item.geometry.type === 'Polygon') {
          item.properties.height = payload;
        }
        return item;
      });
    case STEP_MINUS:
      return initialState;
    default:
      return state;
  }
};
