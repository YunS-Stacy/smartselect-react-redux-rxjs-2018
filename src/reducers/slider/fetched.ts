import {
  FETCH_DATA,
  FETCH_DATA_FULFILLED,
  FETCH_DATA_CANCELLED,
  FETCH_DATA_REJECTED
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState = false;

export default (state = initialState, { type, payload }: Action & { payload?: any}) => {
  switch (type) {
    case FETCH_DATA_FULFILLED:
      return payload && payload.name === 'slider' ? true : state;
    case FETCH_DATA_CANCELLED:
      return payload === 'slider' ? false : state;
    case FETCH_DATA_REJECTED:
      return payload === 'slider' ? false : state;
    default:
      return state;
  }
};
