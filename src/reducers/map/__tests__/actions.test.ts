import { setMap } from '../actions';
import { MAP_SET, ANGLE_SET } from '../../../constants/action-types';

describe('actions', () => {
  it('should create an action to toggle the mode', () => {
    const expectedAction = {
      type: MAP_SET,
      payload: 'welcome',
    };
    expect(setMap('welcome')).toEqual(expectedAction);
  });

  it('should create an action to set the map angle', () => {
    const expectedAction = {
      type: ANGLE_SET,
      payload: {
        bearing: 1,
        // center:
      },
    };
    expect(setMap('welcome')).toEqual(expectedAction);
  });
});
