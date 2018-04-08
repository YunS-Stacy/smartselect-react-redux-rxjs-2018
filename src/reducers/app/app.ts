import { APP_TOGGLE } from '../../constants/action-types';
import { Action } from '../../types/redux';

export const initialState = false;

export default (state = initialState, { type }: Action) => {
  switch (type) {
    case APP_TOGGLE:
      return !state;
    default:
      return state;
  }
};
