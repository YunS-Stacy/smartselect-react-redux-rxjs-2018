import {
  MARKER_SET, MARKER_POSITION_SET, MARKER_RESET
} from '../../constants/action-types';
import { RootState } from '../../types';

export const setMarker = (payload: RootState['marker']) => ({
  payload,
  type: MARKER_SET,
});

export const resetMarker = () => ({
  type: MARKER_RESET,
});

export const setMarkerPosition = (payload: any) => ({
  payload,
  type: MARKER_POSITION_SET,
});
