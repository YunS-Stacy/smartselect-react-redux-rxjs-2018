import {
  POPUP_FETCH, POPUP_ID_SET, POPUP_POSITION_SET, POPUP_ID_RESET, POPUP_RESET,
} from '../../constants/action-types';

export const fetchPopup = (payload: string) => ({
  payload,
  type: POPUP_FETCH,
});

export const setPopupId = (payload: string) => ({
  payload,
  type: POPUP_ID_SET,
});

export const setPopupPosition = (payload: mapboxgl.Point) => ({
  payload,
  type: POPUP_POSITION_SET,
});

export const resetPopupId = () => ({
  type: POPUP_ID_RESET,
});

export const resetPopup = () => ({
  type: POPUP_RESET,
});
