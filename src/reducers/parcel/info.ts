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
import { ALL_RESET, PARCEL_INFO_SET, STATES_SWITCH, PARCEL_INFO_RESET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from '../../types/redux';

type InfoState = RootState['parcel']['info'];
const initialState: InfoState = [];

export default (state = initialState, { type, info, payload }
  : Action & { info?: InfoState } & { payload?: { parcel: { info: InfoState } } }) => {
  switch (type) {
    case STATES_SWITCH:
      return payload.parcel.info;
    case ALL_RESET:
    case PARCEL_INFO_RESET:
      return initialState;
    case PARCEL_INFO_SET:
      // check if there is a record;
      const OIDs = info.map(item => item.OBJECTID);
      const itemID = state.length > 0 ? state.findIndex(item => OIDs.indexOf(item.OBJECTID) > -1) : -1;
      return itemID === -1
        ? state.concat(info) // no record
        : [...state.slice(0, itemID), ...info, ...state.slice(itemID + 1)]; // w/ previous record
    default:
      return state;
  }
};
