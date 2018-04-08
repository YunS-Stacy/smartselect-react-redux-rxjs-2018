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
import { ALL_RESET, SCENARIO_RESET, STATES_SWITCH, PARCEL_TYPE_SET } from '../../constants/action-types';

const initialState = { value: null, status: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STATES_SWITCH:
      return payload.parcel.bldg;
    case SCENARIO_RESET:
    case ALL_RESET:
      return initialState;
    case PARCEL_TYPE_SET:
      const { name, ...rest } = payload;
      return name === 'bldg' ? { ...state, ...rest } : state;
    default:
      return state;
  }
};
