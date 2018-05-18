import {
  POPUP_ID_SET, POPUP_ID_RESET, MARKER_SET
} from '../../constants/action-types';
import { Action } from 'redux';

const initialState: string = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    // set other marker
    case MARKER_SET:
    case POPUP_ID_RESET:
      return initialState;
    case POPUP_ID_SET:
      return payload;
    default:
      return state;
  }
};
