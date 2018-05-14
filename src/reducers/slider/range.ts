import {
  SLIDER_RANGE_SET, STEP_ADD, STEP_MINUS, MAP_RESET,
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: string = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case MAP_RESET:
    case STEP_ADD:
    case STEP_MINUS:
      return initialState;
    case SLIDER_RANGE_SET:
      return payload;
    default:
      return state;
  }
};
