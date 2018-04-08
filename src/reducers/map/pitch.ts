import { MAP_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['pitch'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case MAP_SET:
      return payload && payload.pitch;
    default:
      return state;
  }
};
