import { LAYER_VIZ_SET, MAP_RESET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['layers'] = {
  footprint: 'visible',
  aptParcel: null,
  vacantParcel: null,
  blueprint: null,
};

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case LAYER_VIZ_SET:
      return {
        ...state,
        [payload.name]: payload.viz,
      };
    case MAP_RESET:
      return initialState;
    default:
      return state;
  }
};
