import {
  MARKER_SET
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['marker'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case MARKER_SET: {
      const { position, lon, lat, location, refprice, predicted, zoning, zpid } = payload;
      const source = predicted === 1 ? 'Predicted Value' : 'Record from Latest Transaction';
      const coords = { lat: Number(lat), lng: Number(lon) };
      return { position, coords, refprice, source, zpid, address: location };
    }
    default:
      return state;
  }
};
