/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import reducer from '../info';
import { ALL_RESET, PARCEL_INFO_SET, PARCEL_INFO_RESET } from '../../../constants/action-types';
import { RootState } from '../../../types';

const initialState: RootState['parcel']['info'] = [];
const state = [{
  OBJECTID: 1,
  ParcelID: '99764',
}];

describe('info reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'any' }))
    .toEqual(initialState);
  });

  it('should handle ALL_RESET and PARCEL_INFO_RESET', () => {
    expect(reducer(state, {
      type: ALL_RESET || PARCEL_INFO_RESET,
    })).toEqual([]);
  });

  it('should handle PARCEL_INFO_SET w/ no record', () => {
    expect(reducer(initialState, {
      type: PARCEL_INFO_SET,
      info: [{ OBJECTID: 1, foo: 123 }],
    })).toEqual([{
      OBJECTID: 1,
      foo: 123,
    }]);
  });

  it('should handle PARCEL_INFO_SET, rewrite data w/ the same OID', () => {
    expect(reducer(state, {
      type: PARCEL_INFO_SET,
      info: [{
        OBJECTID: 1,
        foo: 123,
      }],
    })).toEqual([{
      OBJECTID: 1,
      foo: 123,
    }]);
  });
});
