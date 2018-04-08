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
  SERVICE_SAVE,
  STATES_DELETE, STATES_SAVE, STATES_SWITCH,
  SCENARIO_SHOW, SCENARIO_RESET, SCENARIO_COMPARE
} from '../../constants/action-types';

export function saveService() {
  return {
    type: SERVICE_SAVE,
  };
}

export function resetScenario() {
  return {
    type: SCENARIO_RESET,
  };
}

export function saveStates() {
  return {
    type: STATES_SAVE,
  };
}

export function switchStates(payload?: object) {
  return {
    payload,
    type: STATES_SWITCH,
  };
}

export function deleteStates(payload?: object) {
  return {
    payload,
    type: STATES_DELETE,
  };
}

export function showScenario() {
  return {
    type: SCENARIO_SHOW,
  };
}

export function compareScenario(payload?: string) {
  return {
    payload,
    type: SCENARIO_COMPARE,
  };
}
