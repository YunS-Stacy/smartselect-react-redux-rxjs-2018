import { INSTANCE_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['instance'] = null;

export default (state = initialState, { type, payload }: Action & { payload: any }) => {
  switch (type) {
    case INSTANCE_SET:
      return payload;
    default:
      return state;
  }
};
