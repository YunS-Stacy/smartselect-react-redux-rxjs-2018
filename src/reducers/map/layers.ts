import { LAYER_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['layers'] = null;

export default (state = initialState, { type, payload }: Action & { payload: any }) => {
  switch (type) {
    case LAYER_SET:
      return state.set(payload.name, payload.viz);
    default:
      return state;
  }
};
