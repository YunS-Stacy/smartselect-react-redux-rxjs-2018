import {
  FETCH_DATA,
  FETCH_DATA_LOADING,
  FETCH_DATA_FULFILLED,
  FETCH_DATA_CANCELLED,
  FETCH_DATA_REJECTED,
  POPUP_FETCH
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: boolean | string = false;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case FETCH_DATA_LOADING:
      return payload === 'popup' ? 'loading' : state;
    case FETCH_DATA_FULFILLED:
      return payload && payload.name === 'popup' ? true : state;
    case FETCH_DATA_CANCELLED:
      return payload === 'popup' ? false : state;
    case FETCH_DATA_REJECTED:
      return payload === 'popup' ? false : state;
    case POPUP_FETCH:
      return false;
    default:
      return state;
  }
};
