import reducer, { initialState } from '../instance';
import { IS_LOADED } from '../../../constants/action-types';
import { RootState } from '../../../types';
import { Map } from 'mapbox-gl';

const payload = new Map();

describe('loaded reducer', () => {
  it('should return initial state', () => {
    expect(reducer(initialState, {
      type: 'foo',
    })).toEqual(initialState);
  });

  it('should handle IS_LOADED', () => {
    expect(reducer(initialState, {
      type: IS_LOADED,
    })).toEqual(true);
  });
});
