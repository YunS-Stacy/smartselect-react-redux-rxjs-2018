import { IS_LOADED, STEP_SET, STEP_ADD, STEP_MINUS } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['loaded'] = false;

export default (state = initialState, { type, payload }: Action & { payload?: boolean }) => {
  switch (type) {
    case IS_LOADED:
      return payload;
    case STEP_SET:
    case STEP_ADD:
    case STEP_MINUS:
    // when enter a new mode, default loaded as false
      return false;
    default:
      return state;
  }
};
