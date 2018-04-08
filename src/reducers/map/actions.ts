import { MAP_SET, ANGLE_SET } from '../../constants/action-types';

export const setMap = (payload: string) => ({
  payload,
  type: MAP_SET,
});

export const setAngle = (payload: object) => ({
  payload,
  type: ANGLE_SET,
});
