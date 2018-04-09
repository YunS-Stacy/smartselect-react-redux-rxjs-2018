import { IS_LOADED } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['loaded'] = false;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case IS_LOADED:
      return true;
    default:
      return state;
  }
};
