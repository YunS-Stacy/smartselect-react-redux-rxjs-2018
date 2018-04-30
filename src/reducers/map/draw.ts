import { DRAW_TOGGLE } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['draw'] = false;

export default (state = initialState, { type, payload }: Action & { payload: any }) => {
  switch (type) {
    case DRAW_TOGGLE:
      return !state;
    default:
      return state;
  }
};
