import {
  DATA_FETCH_LOADING,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_CANCELLED,
  DATA_FETCH_REJECTED,
  ROUTE_FETCH
} from '../../constants/action-types';
import { Action } from 'redux';

const initialState: boolean | string = false;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    // set other marker
    case DATA_FETCH_LOADING:
      return payload === 'route' ? 'loading' : state;
    case DATA_FETCH_FULFILLED:
      return payload && payload.name === 'route' ? true : state;
    case DATA_FETCH_CANCELLED:
      return payload === 'route' ? false : state;
    case DATA_FETCH_REJECTED:
      return payload.name === 'route' ? false : state;
    case ROUTE_FETCH:
      return false;
    default:
      return state;
  }
};
