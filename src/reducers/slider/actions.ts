import {
  SLIDER_RANGE_SET
} from '../../constants/action-types';

export const setSliderRange = (payload: number[]) => ({
  payload,
  type: SLIDER_RANGE_SET,
});
