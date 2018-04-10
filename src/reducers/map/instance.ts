import { INSTANCE_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

export const initialState: RootState['map']['instance'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: mapboxgl.Map }) => {
  switch (type) {
    case INSTANCE_SET:
      console.log(payload, 'pay');
      return state || payload;
    default:
      return state;
  }
};
