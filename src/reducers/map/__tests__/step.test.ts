import reducer from '../step';
import { STEP_SET, MAP_RESET, STEP_MINUS, STEP_ADD } from '../../../constants/action-types';
import { RootState } from '../../../types';

const initialState = null;
const state: RootState['map']['step'] = 2;

describe('map reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle STEP_SET', () => {
    expect(reducer(state, {
      payload: 4,
      type: STEP_SET,
    })).toEqual(4);
  });

  it('should handle STEP_ADD', () => {
    expect(reducer(state, {
      type: STEP_ADD,
    })).toEqual(state + 1);
  });

  it('should handle STEP_MINUS', () => {
    expect(reducer(state, {
      type: STEP_MINUS,
    })).toEqual(state - 1);
  });

  it('should handle MAP_RESET', () => {
    expect(reducer(state, {
      type: MAP_RESET,
    })).toEqual(initialState);
  });

});
