import {
  DATA_FETCH,
  DATA_FETCH_LOADING,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_CANCELLED,
  DATA_FETCH_REJECTED,
  POPUP_FETCH,
  MARKER_SET
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: boolean | string = false;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    // set other marker
    case MARKER_SET:
      return initialState;
    case DATA_FETCH_LOADING:
      return payload === 'popup' ? 'loading' : state;
    case DATA_FETCH_FULFILLED:
      return payload && payload.name === 'popup' ? true : state;
    case DATA_FETCH_CANCELLED:
      return payload === 'popup' ? false : state;
    case DATA_FETCH_REJECTED:
      return payload.name === 'popup' ? false : state;
    case POPUP_FETCH:
      return false;
    default:
      return state;
  }
};
