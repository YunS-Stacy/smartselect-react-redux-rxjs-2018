import {
  MARKER_SET, MARKER_POSITION_SET,
} from '../../constants/action-types';
import { RootState } from '../../types';

export const setMarker = (payload: RootState['marker']) => ({
  payload,
  type: MARKER_SET,
});

export const setMarkerPosition = (payload: any) => ({
  payload,
  type: MARKER_POSITION_SET,
});
