import {
  DATA_FETCH,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_CANCELLED,
  DATA_FETCH_REJECTED
} from '../../constants/action-types';
import { RootState } from '../../types';
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
