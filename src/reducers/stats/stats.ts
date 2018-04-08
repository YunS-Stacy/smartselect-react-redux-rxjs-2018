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

import { ALL_RESET, STATS_SET, STATS_SHOW_SET, SCENARIO_RESET, STATES_SWITCH } from '../../constants/action-types';

const initialState = {
  show: false,
};

export default (state = initialState, { type, payload, ...rest }) => {
  switch (type) {
    case STATES_SWITCH:
      return payload.stats;
    case STATS_SET: {
      return { ...state, ...rest };
    }
    case STATS_SHOW_SET: {
      const { show } = state;
      return { ...state, show: !show };
    }
    case SCENARIO_RESET:
    case ALL_RESET:
      return initialState;
    default:
      return state;
  }
};
