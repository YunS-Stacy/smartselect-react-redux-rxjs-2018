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

import {
  ALL_RESET,
  STATES_SAVE,
  STATES_SWITCH,
  SCENARIO_RESET,
  SCENARIO_COMPARE,
  STATES_DELETE,
} from '../../constants/action-types';
import { Action } from '../../types/redux';
import { RootState } from '../../types';

const initialState: RootState['scenario']['compare'] = [];

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case SCENARIO_COMPARE: {
      const itemID = state.length > 0 ? state.indexOf(payload) : -1;
      return itemID === -1
        ? [...state, payload] // no record
        : [...state.slice(0, itemID), ...state.slice(itemID + 1)]; // w/ previous record
    }

    case STATES_DELETE: {
      const { jobId } = payload;
      const itemID = jobId && state.length > 0 ? state.indexOf(jobId) : -1;
      return itemID === -1
        ? state // not in comparison
        : [...state.slice(0, itemID), ...state.slice(itemID + 1)]; // w/ previous record
    }

    case SCENARIO_RESET:
    case ALL_RESET:
      return initialState;

    default:
      return state;
  }
};
