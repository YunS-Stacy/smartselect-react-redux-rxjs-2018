import { MAP_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

export const initialState: RootState['map']['bearing'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case MAP_SET:
      return payload && payload.bearing;
    default:
      return state;
  }
};
