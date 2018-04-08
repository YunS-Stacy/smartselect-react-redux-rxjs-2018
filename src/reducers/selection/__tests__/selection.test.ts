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

import reducer from '../selection';
import { ALL_RESET, SCENARIO_RESET, SELECTION_SET, SELECTION_RESET } from '../../../constants/action-types';

describe('selection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'any' })).toEqual([]);
  });

  it('should handle ALL_RESET, SCENARIO_RESET and SELECTION_RESET', () => {
    expect(reducer([], {
      type: ALL_RESET || SCENARIO_RESET || SELECTION_RESET,
    })).toEqual([]);
  });

  it('should handle SELECTION_SET', () => {
    expect(reducer([], {
      type: SELECTION_SET,
      layer: 'foo',
      OID: 1,
    })).toEqual([{ layer: 'foo', OID: 1 }]);
  });
});
