import reducer, { initialState } from '../instance';
import { INSTANCE_SET } from '../../../constants/action-types';
import { RootState } from '../../../types';
import { Map } from 'mapbox-gl';

const payload = new Map();

describe('instance reducer', () => {
  it('should return initial state', () => {
    expect(reducer(initialState, {
      type: 'foo',
    })).toEqual(initialState);
  });

  it('should handle INSTANCE_SET', () => {
    expect(reducer(initialState, {
      payload,
      type: INSTANCE_SET,
    })).toEqual('foo');
  });
});
