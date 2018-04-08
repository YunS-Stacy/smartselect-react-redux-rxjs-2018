import { toggleApp } from '../actions';
import { APP_TOGGLE } from '../../../constants/action-types';

describe('actions', () => {
  it('should create an action to toggle the mode', () => {
    const expectedAction = {
      type: APP_TOGGLE,
    };
    expect(toggleApp()).toEqual(expectedAction);
  });
});
