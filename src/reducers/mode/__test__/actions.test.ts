import { setMode } from '../actions';
import { MODE_SET } from '../../../constants/action-types';

describe('actions', () => {
  it('should create an action to set the map mode', () => {
    const expectedAction = {
      type: MODE_SET,
      payload: 'welcome',
    };
    expect(setMode('welcome')).toEqual(expectedAction);
  });
});
