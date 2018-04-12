import { MODE_SET } from '../../constants/action-types';

export const setMode = (payload: string) => ({
  payload,
  type: MODE_SET,
});
