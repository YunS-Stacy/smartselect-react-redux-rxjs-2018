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

import reducer from '../typelists';
import { TYPELISTS_SET } from '../../../constants/action-types';

describe('typelists reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(null, { type: 'any', zoning: undefined, bldg: undefined })).toEqual(null);
  });

  it('should handle TYPELISTS_SET', () => {
    expect(reducer(null, {
      type: TYPELISTS_SET,
      zoning: ['zoning1', 'zoning2', 'zoning3'],
      bldg: ['bldg1', 'bldg2', 'bldg3'],
    })).toEqual({
      zoning: ['zoning1', 'zoning2', 'zoning3'],
      bldg: ['bldg1', 'bldg2', 'bldg3'],
    });
  });
});
