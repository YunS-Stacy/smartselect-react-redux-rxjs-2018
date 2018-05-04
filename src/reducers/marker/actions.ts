import {
  MARKER_SET,
} from '../../constants/action-types';
import { RootState } from '../../types';

export const setMarker = (payload: RootState['marker']) => ({
  payload,
  type: MARKER_SET,
});
