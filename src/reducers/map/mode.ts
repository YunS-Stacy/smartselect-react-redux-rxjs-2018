import { MODE_SET, MAP_RESET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['mode'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: string }) => {
  switch (type) {
    case MODE_SET:
      return payload;
    case MAP_RESET:
      return initialState;
    default:
      return state;
  }
};
