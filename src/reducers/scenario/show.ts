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
import { ALL_RESET, SCENARIO_SHOW } from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from '../../types/redux';

type State = RootState['scenario']['show'];
const initialState: State = false;

export default (state = initialState, { type }: Action) => {
  switch (type) {
    case ALL_RESET:
      return initialState;
    case SCENARIO_SHOW:
      return !state;
    default:
      return state;
  }
};
