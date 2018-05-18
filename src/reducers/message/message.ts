import { DATA_FETCH_REJECTED } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['message'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: { name: string; message: 'string'} }) => {
  switch (type) {
    case DATA_FETCH_REJECTED:
      return payload.message || state;
    default:
      return state;
  }
};
