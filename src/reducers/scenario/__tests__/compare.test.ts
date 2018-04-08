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

import reducer from '../compare';
import { ALL_RESET, SCENARIO_COMPARE, STATES_DELETE } from '../../../constants/action-types';
import { RootState } from '../../../types';

const initialState = [];
const state: RootState['scenario']['compare'] = ['123', '321'];

describe('scenario reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(state, { type: 'any' })).toEqual(state);
  });

  it('should handle ALL_RESET', () => {
    expect(reducer(state, {
      type: ALL_RESET,
    })).toEqual(initialState);
  });

  it('should handle SCENARIO_COMPARE, add if no prev record', () => {
    expect(reducer(state, {
      type: SCENARIO_COMPARE,
      payload: 'foo',
    })).toEqual([
      '123', '321', 'foo',
    ]);
  });

  it('should handle SCENARIO_COMPARE, delete if w/ prev record', () => {
    expect(reducer(state, {
      type: SCENARIO_COMPARE,
      payload: '123',
    })).toEqual([
      '321',
    ]);
  });

  it('should handle STATES_DELETE, return same state if no match', () => {
    expect(reducer(initialState, {
      type: STATES_DELETE,
      payload: { jobId: '123' },
    })).toEqual([]);
  });

  it('should handle STATES_DELETE, delete id if match', () => {
    expect(reducer(state, {
      type: STATES_DELETE,
      payload: { jobId: '123' },
    })).toEqual(['321']);
  });
});
