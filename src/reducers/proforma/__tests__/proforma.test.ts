/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import reducer from '../proforma';
import { ALL_RESET, PROFORMA_SET, PROFORMA_RESET, CATE_SET, SCENARIO_RESET } from '../../../constants/action-types';

describe('proforma reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'any' })).toEqual({
      workbook: null,
      inputs: null,
      inputCates: null,
      selectedCate: null,
      outputs: null,
    });
  });

  it('should handle ALL_RESET, SCENARIO_RESET, PROFORMA_RESET', () => {
    expect(reducer(undefined, {
      type: ALL_RESET || SCENARIO_RESET || PROFORMA_RESET,
    })).toEqual({
      workbook: null,
      inputs: null,
      inputCates: null,
      selectedCate: null,
      outputs: null,
    });
  });

  it('should handle PROFORMA_SET', () => {
    expect(reducer(undefined, {
      type: PROFORMA_SET,
      workbook: ({
        Workbook: {
          Names: [
            {
              Name: 'Inputs__Input_Category_Name__InputName',
              Ref: 'Data!$H$25',
            },
            {
              Name: 'Outputs__Output_Category_Name__OutputName',
              Ref: 'Data!$G$25',
            },
          ],
        },
        Sheets: {
          Data: {
            '!ref': 'A1:O64',
            H25: {
              t: 'n',
              v: 10,
              z: 'General',
              f: null,
            },
            G25: {
              t: 'n',
              v: 1000,
              z: 'General',
              f: null,
            },
          },
        },
      } as any),
    })).toEqual({
      workbook: {
        Workbook: {
          Names: [
            {
              Name: 'Inputs__Input_Category_Name__InputName',
              Ref: 'Data!$H$25',
            },
            {
              Name: 'Outputs__Output_Category_Name__OutputName',
              Ref: 'Data!$G$25',
            },
          ],
        },
        Sheets: {
          Data: {
            '!ref': 'A1:O64',
            H25: {
              t: 'n',
              v: 10,
              z: 'General',
              f: null,
            },
            G25: {
              t: 'n',
              v: 1000,
              z: 'General',
              f: null,
            },
          },
        },
      },
      inputs: [{
        name: 'InputName',
        sheet: 'Data',
        cell: 'H25',
        cate: 'Input Category Name',
        value: '10',
        f: null,
        z: 'General',
      }],
      inputCates: ['Input Category Name'],
      selectedCate: 'Input Category Name',
      outputs: [{
        name: 'OutputName',
        sheet: 'Data',
        cell: 'G25',
        cate: 'Output Category Name',
        value: '1000',
        f: null,
        z: 'General',
      }],
    });
  });

  it('should handle CATE_SET', () => {
    expect(reducer({
      workbook: null,
      inputs: null,
      inputCates: null,
      selectedCate: null,
      outputs: null,
    }, {
      type: CATE_SET,
      selectedCate: 'finance',
    })).toEqual({
      workbook: null,
      inputs: null,
      inputCates: null,
      selectedCate: 'finance',
      outputs: null,
    });
  });
});
