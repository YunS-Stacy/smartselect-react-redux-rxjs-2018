import {
  SLIDER_RANGE_SET
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['slider']['range'] = [];

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case SLIDER_RANGE_SET:
      return payload || state;
    default:
      return state;
  }
};
