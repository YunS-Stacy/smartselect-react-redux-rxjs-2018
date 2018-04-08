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

import { setStatsShow } from '../actions';
import { STATS_SHOW_SET } from '../../../constants/action-types';

describe('actions', () => {
  it('should create an action to initialize the scene view container', () => {
    const expectedAction = {
      type: STATS_SHOW_SET,
    };
    expect(setStatsShow()).toEqual(expectedAction);
  });
});
