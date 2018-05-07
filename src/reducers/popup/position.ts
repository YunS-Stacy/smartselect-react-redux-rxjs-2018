import {
  POPUP_POSITION_SET, POPUP_ID_RESET, MARKER_SET
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['popup']['position'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: mapboxgl.Point }) => {
  switch (type) {
    // set other marker
    case MARKER_SET:
    case POPUP_ID_RESET:
      return initialState;
    case POPUP_POSITION_SET:
      return { ...state, ...payload };
    default:
      return state;
  }
};
