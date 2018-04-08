import reducer, { initialState } from '../bearing';
import { MAP_SET, ANGLE_SET } from '../../../constants/action-types';
import { RootState } from '../../../types';

const state = 0;
const payload = {
  center: [-75.1639, 39.9522],
  pitch: [65],
  zoom: [14],
  bearing: 9.2,
};
describe('map reducer', () => {
  it('should handle MAP_SET', () => {
    expect(reducer(state, {
      payload,
      type: MAP_SET,
    })).toEqual(9.2);
  });

  it('should handle ANGLE_SET', () => {
    expect(reducer(state, {
      payload,
      type: ANGLE_SET,
    })).toEqual(9.2);
  });
});
