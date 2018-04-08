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

import reducer from '../states';
import { ALL_RESET, STATES_SWITCH, STATES_SAVE, SERVICE_SAVE } from '../../../constants/action-types';
import { RootState } from '../../../types';

const initialState = null;
const state: RootState['scenario']['states'] = {
  foo123: {
    parcel: {
      info: [{ foo: 123 }],
      zoning: {
        value: 'B-1',
        status: true,
      },
      bldg: {
        value: 'Hotel',
        status: true,
      },
    },
    proforma: {
      workbook: null,
      inputs: null,
      inputCates: null,
      selectedCate: null,
      outputs: null,
    },
    stats: undefined,
  },
};

describe('scenario reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(state, { type: 'any' })).toEqual(state);
  });

  it('should handle ALL_RESET', () => {
    expect(reducer(state, {
      type: ALL_RESET,
    })).toEqual(initialState);
  });

  it('should handle STATES_SAVE, append new record', () => {
    expect(reducer(state, {
      type: STATES_SAVE,
      payload: {
        jobId: '123',
        foo: 'foo',
      },
    })).toEqual({
      ...state,
      123: { foo: 'foo' },
    });
  });

  it('should handle STATES_SAVE, overwrite/update the same record', () => {
    expect(reducer(state, {
      type: STATES_SAVE,
      payload: {
        jobId: 'foo123',
        foo: 'foo',
      },
    })).toEqual({
      foo123: {
        ...state.foo123,
        foo: 'foo',
      },
    });
  });
});
