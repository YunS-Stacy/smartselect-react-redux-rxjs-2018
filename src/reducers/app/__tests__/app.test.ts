import reducer, { initialState } from '../app';
import { APP_TOGGLE } from '../../../constants/action-types';

const state = true;

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(state, { type: 'any' })).toEqual(state);
  });

  it('should handle APP_TOGGLE', () => {
    expect(reducer(state, {
      type: APP_TOGGLE,
    })).toEqual(!state);
  });
});
