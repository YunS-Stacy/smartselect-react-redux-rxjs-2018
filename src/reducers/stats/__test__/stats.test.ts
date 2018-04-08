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

import reducer from '../stats';
import { ALL_RESET, STATS_SET, STATS_SHOW_SET, SCENARIO_RESET } from '../../../constants/action-types';

describe('selection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'any' })).toEqual({
      show: false,
    });
  });

  it('should handle ALL_RESET and SCENARIO_RESET', () => {
    expect(reducer(undefined, {
      type: ALL_RESET || SCENARIO_RESET,
    })).toEqual({
      show: false,
    });
  });

  it('should handle STATS_SET', () => {
    expect(reducer(undefined, {
      type: STATS_SET,
      spaceUseList: [
        'foo',
      ],
      areaByUsage: [
        {
          spaceUse: 'foo',
          area: 123,
          floors: 123,
          units: 123,
        },
      ],
      totalArea: 123,
      maxFlrNum: 123,
    })).toEqual({
      spaceUseList: [
        'foo',
      ],
      areaByUsage: [
        {
          spaceUse: 'foo',
          area: 123,
          floors: 123,
          units: 123,
        },
      ],
      show: false,
      totalArea: 123,
      maxFlrNum: 123,
    });
  });

  it('should handle STATS_SHOW_SET', () => {
    expect(reducer({ show: true }, {
      type: STATS_SHOW_SET,
    })).toEqual({
      show: false,
    });
  });
});
