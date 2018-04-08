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

import reducer from '../current';
import {
  ALL_RESET,
  STATES_SAVE,
  STATES_SWITCH,
  SCENARIO_RESET,
} from '../../../constants/action-types';

const initialState = null;
const state = '123abc';

describe('scenario reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(state, { type: 'any' })).toEqual(state);
  });

  it('should handle ALL_RESET and SCENARIO_RESET', () => {
    expect(reducer(state, {
      type: ALL_RESET || SCENARIO_RESET,
    })).toEqual(initialState);
  });

  it('should handle STATES_SAVE', () => {
    expect(reducer(state, {
      type: STATES_SAVE,
      payload: {
        jobId: '123',
        status: 'saving',
      },
    })).toEqual('123');
  });

  it('should handle STATES_SWITCH', () => {
    expect(reducer(state, {
      type: STATES_SWITCH,
      payload: {
        jobId: '123',
        status: 'saving',
      },
    })).toEqual('123');
  });
});
