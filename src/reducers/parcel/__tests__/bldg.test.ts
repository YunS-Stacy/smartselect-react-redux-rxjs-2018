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

import reducer from '../bldg';
import { ALL_RESET, PARCEL_TYPE_SET, SCENARIO_RESET } from '../../../constants/action-types';

const initialState = { value: null, status: null };
const state = { value: 'Office', status: true };

describe('Bldg Logic', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: 'any', payload: undefined }))
      .toEqual(initialState);
  });

  it('should handle ALL_RESET and SCENARIO_RESET', () => {
    expect(reducer(state, {
      type: ALL_RESET || SCENARIO_RESET,
      payload: null,
    })).toEqual(initialState);
  });

  it('should handle PARCEL_TYPE_SET', () => {
    expect(reducer(initialState, {
      type: PARCEL_TYPE_SET,
      payload: { name: 'bldg', value: 'foo', status: false },
    })).toEqual({ value: 'foo', status: false });
  });
});
