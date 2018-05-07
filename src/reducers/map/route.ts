import { ROUTE_SET, MAP_RESET, MARKER_RESET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['route'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: string }) => {
  switch (type) {
    case ROUTE_SET:
      return payload;
    case MAP_RESET:
    case MARKER_RESET:
      return initialState;
    default:
      return state;
  }
};
