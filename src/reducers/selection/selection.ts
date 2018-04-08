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

// Feasibility App prototype
// Phase I - single parcel only
// Phase II - multiple parcel - multiple selection

import { ALL_RESET, SELECTION_SET, SELECTION_RESET, SCENARIO_RESET } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from '../../types/redux';

const initialState: RootState['selection'] = [];

// // multiple select
// const findItem = (array, layer, OID) => array.find(item => item.layer === layer
//   && item.OID === OID);

// const addItem = (array, layer, OID) => {
//   const newArray = [...array, {
//     layer,
//     OID,
//   }];
//   return newArray;
// };

// const removeItem = (array, layer, OID) => {
//   const index = array.findIndex(item => item.layer === layer && item.OID === OID);
//   const newArray = [...array.slice(0, index), ...array.slice(index + 1)];
//   return newArray;
// };

// export default (state = initialState, action) => {
//   const { type, layer, OID } = action;
//   switch (type) {
//     case SELECTION_SET:
//       return findItem(state, layer, OID)
//         ? removeItem(state, layer, OID)
//         : addItem(state, layer, OID);
//     case SELECTION_RESET:
//       return initialState;
//     default:
//       return state;
//   }
// };

// multiple select
// const findItem = (array, layer, OID) => array.find(item => item.layer === layer
//   && item.OID === OID);

// const addItem = (array, layer, OID) => {
//   const newArray = [...array, {
//     layer,
//     OID,
//   }];
//   return newArray;
// };

// const removeItem = (array, layer, OID) => {
//   const index = array.findIndex(item => item.layer === layer && item.OID === OID);
//   const newArray = [...array.slice(0, index), ...array.slice(index + 1)];
//   return newArray;
// };

// export default (state = initialState, action) => {
//   const { type, layer, OID } = action;
//   switch (type) {
//     case SELECTION_SET:
//       return findItem(state, layer, OID)
//         ? removeItem(state, layer, OID)
//         : addItem(state, layer, OID);
//     case SELECTION_RESET:
//       return initialState;
//     default:
//       return state;
//   }
// };

// single select
const findItem = (array: RootState['selection'], layer: string, OID: number) => (array.length > 0
  ? array.find(item => item.layer === layer && item.OID === OID)
  : undefined);

export default (state = initialState, { type, layer, OID }: Action & any) => {
  switch (type) {
    case SELECTION_SET:
      return findItem(state, layer, OID)
        ? initialState
        : [{ layer, OID }];
    case ALL_RESET:
    case SELECTION_RESET:
      return initialState;
    default:
      return state;
  }
};
