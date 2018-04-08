import reducer from '../zoom';
import { MAP_SET } from '../../../constants/action-types';
import { RootState } from '../../../types';

const state = [-1, -1];
const payload = {
  center: [-75.1639, 39.9522],
  pitch: [65],
  zoom: [14],
  bearing: 9.2,
};

describe('map reducer', () => {
  it('should handle SET_MAP', () => {
    expect(reducer(state, {
      payload,
      type: MAP_SET,
    })).toEqual([14]);
  });
});
