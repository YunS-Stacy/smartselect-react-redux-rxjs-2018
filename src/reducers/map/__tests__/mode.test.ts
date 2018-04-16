import reducer from '../mode';
import { MODE_SET } from '../../../constants/action-types';
import { RootState } from '../../../types';

const state: RootState['mode'] = 'foo';

describe('map reducer', () => {
  it('should handle MODE_SET', () => {
    expect(reducer(state, {
      payload: 'intro',
      type: MODE_SET,
    })).toEqual('intro');
  });
});
