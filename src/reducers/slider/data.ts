import {
  DATA_FETCH_FULFILLED,
} from '../../constants/action-types';
import { Action } from 'redux';

const initialState: any[] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any}) => {
  switch (type) {
    case DATA_FETCH_FULFILLED:
      const { name, data } = payload;
      if (name === 'slider') {
        return data;
      }
      return state;
    default:
      return state;
  }
};
