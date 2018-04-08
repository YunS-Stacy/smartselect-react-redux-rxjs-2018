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
  STATES_DELETE,
} from '../../constants/action-types';
import { Action } from '../../types/redux';
import { RootState } from '../../types';

const initialState: RootState['scenario']['states'] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case STATES_SAVE: {
      if (payload && payload.jobId) {
        const { jobId, ...restPayload } = payload;
        const oldState = (state && state[jobId]) ? state[jobId] : null;
        const newState = {
          ...oldState,
          ...restPayload,
        };
        return { ...state, [jobId]: newState };
      }
      return state;
    }

    case STATES_DELETE: {
      if (payload && payload.jobId) {
        const { jobId, ...rest } = payload;
        if (state && state[jobId]) {
          const { [jobId]: value, ...rest } = state;
          // check rest, confirm not { }
          return Object.keys(rest).length > 0 ? rest : initialState;
        }
        return state;
      }
      return state;
    }

    case ALL_RESET:
      return initialState;

    default:
      return state;
  }
};
