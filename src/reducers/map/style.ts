import { STYLE_SET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';

const initialState: RootState['map']['style'] = 'customized';

export default (state = initialState, { type, payload }: Action & { payload?: string }) => {
  switch (type) {
    case STYLE_SET:
      return payload || state;
    default:
      return state;
  }
};
