import {
  DATA_FETCH_FULFILLED,
  DATA_FETCH_CANCELLED,
  DATA_FETCH_REJECTED
} from '../../constants/action-types';
import { Action } from 'redux';

const initialState = false;

export default (state = initialState, { type, payload }: Action & { payload?: any}) => {
  switch (type) {
    case DATA_FETCH_FULFILLED:
      return payload && payload.name === 'slider' ? true : state;
    case DATA_FETCH_CANCELLED:
      return payload === 'slider' ? false : state;
    case DATA_FETCH_REJECTED:
      return payload === 'slider' ? false : state;
    default:
      return state;
  }
};
