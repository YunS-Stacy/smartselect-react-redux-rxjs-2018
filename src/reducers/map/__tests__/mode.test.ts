import reducer from '../mode';
import { MODE_SET, MAP_RESET } from '../../../constants/action-types';
import { RootState } from '../../../types';

const initialState = null;
const state: RootState['map']['mode'] = 'query';

describe('map reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle MODE_SET', () => {
    expect(reducer(state, {
      payload: 'intro',
      type: MODE_SET,
    })).toEqual('intro');
  });

  it('should handle MAP_RESET', () => {
    expect(reducer(state, {
      type: MAP_RESET,
    })).toEqual(initialState);
  });

});
