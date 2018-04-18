import { STEP_SET, MAP_RESET, STEP_ADD, STEP_MINUS, GEOMETRY_GET, GEOMETRY_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['geometry'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: RootState['map']['geometry'] }) => {
  switch (type) {
    case GEOMETRY_SET:
      return payload;
    default:
      return state;
  }
};
