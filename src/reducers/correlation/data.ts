import {
  DATA_FETCH_FULFILLED,
} from '../../constants/action-types';
import { Action } from 'redux';

const initialState: any[] = [];

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case DATA_FETCH_FULFILLED:
      const { name, data } = payload;
      if (name === 'correlation') {
        return data;
      }
      return state;
    default:
      return state;
  }
};
