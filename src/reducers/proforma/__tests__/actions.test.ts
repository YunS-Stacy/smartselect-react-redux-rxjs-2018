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

import { setProforma, resetProforma, exportProforma, importProforma, setCate } from '../actions';
import {
  PROFORMA_SET, PROFORMA_RESET, PROFORMA_EXPORT, PROFORMA_IMPORT, CATE_SET
} from '../../../constants/action-types';

describe('actions', () => {
  it('should create an action to set the proforma', () => {
    const expectedAction = {
      type: PROFORMA_SET,
      workbook: { foo: 'foo' },
      selectedCate: 'category',
    };
    expect(setProforma({
      workbook: { foo: 'foo' },
      selectedCate: 'category',
    })).toEqual(expectedAction);
  });

  it('should create an action to reset the proforma', () => {
    const expectedAction = {
      type: PROFORMA_RESET,
    };
    expect(resetProforma()).toEqual(expectedAction);
  });

  it('should create an action to export the proforma', () => {
    const expectedAction = {
      type: PROFORMA_EXPORT,
      foo: 'foo',
    };
    expect(exportProforma({ foo: 'foo' })).toEqual(expectedAction);
  });

  it('should create an action to import the proforma', () => {
    const expectedAction = {
      type: PROFORMA_IMPORT,
      foo: 'foo',
    };
    expect(importProforma({ foo: 'foo' })).toEqual(expectedAction);
  });

  it('should create an action to set the proforma inputs categories', () => {
    const expectedAction = {
      type: CATE_SET,
      selectedCate: 'foo',
    };
    expect(setCate('foo')).toEqual(expectedAction);
  });
});
