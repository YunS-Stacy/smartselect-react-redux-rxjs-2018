import { STEP_SET, MAP_RESET, STEP_ADD, STEP_MINUS } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['step'] = 0;

export default (state = initialState, { type, payload }: Action & { payload?: number }) => {
  switch (type) {
    case STEP_SET:
      return payload;
    case STEP_ADD:
      return state + 1;
    case STEP_MINUS:
      return state - 1;
    case MAP_RESET:
      return initialState;
    default:
      return state;
  }
};
