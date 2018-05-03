import {
  POPUP_FETCH,
} from '../../constants/action-types';

export const fetchPopup = (payload: number) => ({
  payload,
  type: POPUP_FETCH,
});
