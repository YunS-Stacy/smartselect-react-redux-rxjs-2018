import {
  FETCH_DATA,
  FETCH_DATA_FULFILLED,
  FETCH_DATA_CANCELLED,
  FETCH_DATA_REJECTED
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: any[] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case FETCH_DATA_FULFILLED:
      const { name, data } = payload;
      if (name === 'popup') {
        console.log(name, data, 'popup');
        return data;
      }
      return state;
    default:
      return state;
  }
};
