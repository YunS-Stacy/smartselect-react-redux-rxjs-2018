import {
  DATA_FETCH,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_CANCELLED,
  DATA_FETCH_REJECTED,
  DATA_FETCH_LOADING,
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState = false;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case DATA_FETCH_FULFILLED:
      return payload && payload.name === 'correlation' ? true : state;
    case DATA_FETCH_CANCELLED:
      return payload === 'correlation' ? false : state;
    case DATA_FETCH_REJECTED:
      return payload === 'correlation' ? false : state;
    case DATA_FETCH_LOADING:
      return payload === 'correlation' ? 'loading' : state;
    default:
      return state;
  }
};
