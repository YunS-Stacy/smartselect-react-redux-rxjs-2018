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
import { SSF, WorkBook, CellObject } from 'xlsx';
import {
  ALL_RESET, SCENARIO_RESET, PROFORMA_SET, PROFORMA_RESET, CATE_SET, STATES_SWITCH,
} from '../../constants/action-types';
import { calcWorkbook } from '../../utils/calcWorkbook';
import { RootState } from '../../types';
import { Action } from '../../types/redux';

interface NamedCellObject {
  name: string;
  sheet?: string;
  cell?: string;
  value?: string | number;
  cate?: string;
  f?: any;
  z?: any;
}
const initialState: RootState['proforma'] = {
  workbook: null,
  inputs: null,
  inputCates: null,
  selectedCate: null,
  outputs: null,
};

const setValue = (workbook: WorkBook, sheet: string, cell: string) => {
  // for value below zero, need additional formatting
  if (workbook.Sheets[sheet][cell]) {
    let { z } = workbook.Sheets[sheet][cell];
    const num = z.search(';');
    if (num !== -1) {
      // only use the format for value > 0
      z = z.substr(0, num);
    }
    if (/%/.test(z)) {
      return workbook.Sheets[sheet][cell].v;
    }
    return SSF.format(z, workbook.Sheets[sheet][cell].v).trimRight();
  }
  return undefined;
};

const setNamedCells = (workbook: WorkBook) => {
  // eliminate the default property of workbook
  const names = workbook.Workbook.Names.filter(({ Name }) => !/^_/.test(Name));

  return names.map((item) => {
    const array = item.Ref.split('!');
    // regexp for $, !
    // eslint-disable-next-line no-useless-escape
    return { name: item.Name, sheet: array[0], cell: array[1].replace(/[\$!]/gi, '') };
  });
};

const setInputs = (cells: NamedCellObject[]) => {
  const list = cells.filter(({ name }) => /^inputs/i.test(name));
  return list.map((item) => {
    const names = item.name.split('__');
    const [cate, ...rest] = names.slice(1);
    return { ...item, cate: cate.replace(/_/g, ' '), name: rest.join('').replace(/_/g, ' ') };
  });
};

const setInputCates = (list: NamedCellObject[]) => {
  const array: string[] = [];
  list.forEach(({ cate }) => {
    if (!array.includes(cate)) {
      array.push(cate);
    }
  });
  return array;
};

const setOutputs = (cells: NamedCellObject[]) => {
  const list = cells.filter(({ name }) => /^outputs/i.test(name));
  return list.map((item) => {
    const names = item.name.split('__');
    const [cate, ...rest] = names.slice(1);
    return { ...item, cate: cate.replace(/_/g, ' '), name: rest.join('').replace(/_/g, ' ') };
  });
};

export default (state = initialState, { type, payload, workbook, selectedCate, defaultInputs }: Action & any) => {
  switch (type) {
    case STATES_SWITCH:
      return payload.proforma;
    case PROFORMA_SET: {
      const namedCells = setNamedCells(workbook);
      const inputs = setInputs(namedCells);
      const outputs = setOutputs(namedCells);
      // set default value from gp tool results, if any
      if (defaultInputs) {
        // set commercial gfa
        const commercialGFA = defaultInputs
          .filter(({ spaceUse }) => !/residential/i.test(spaceUse))
          .map(item => item.area)
          .reduce((accum, current) => accum + current, 0);
        const { sheet: commercialSheet, cell: commercialCell } = namedCells
        .filter(({ name }) => /gfa/i.test(name) && /commercial/i.test(name))[0];
        const commercialGFACell = workbook.Sheets[commercialSheet][commercialCell] || null;

        if (commercialGFACell) {
          // override formula
          if (commercialGFACell.f) {
            // console.log('override formula');            // override any formula
          }
          commercialGFACell.f = null;

          // override value
          if (commercialGFACell.v !== commercialGFA) {
            // console.log('override value');
          }
          commercialGFACell.v = commercialGFA;
        }

        // set housing gfa
        const housingGFA = defaultInputs
          .filter(({ spaceUse }) => /residential/i.test(spaceUse))
          .map(item => item.area)
          .reduce((accum, current) => accum + current, 0);
        const { sheet: housingSheet, cell: housingCell } = namedCells
        .filter(({ name }) => /gfa/i.test(name) && /housing/i.test(name))[0];
        const housingGFACell = workbook.Sheets[housingSheet][housingCell] || null;
        if (housingGFACell) {
          // override formula
          if (housingGFACell.f) {
            // console.log('override formula');
          }
          housingGFACell.f = null;

          // override value
          if (housingGFACell.v !== housingGFA) {
            // console.log('value override alert');
          }
          housingGFACell.v = housingGFA;
        }

        // set housing units
        const housingUnits = defaultInputs
          .filter(({ spaceUse }) => /residential/i.test(spaceUse))
          .map(item => item.units)
          .reduce((accum, current) => accum + current, 0);
        const { sheet: housingUnitsSheet, cell: housingUnitsCell } =
          namedCells.filter(({ name }) => /units/i.test(name) && /housing/i.test(name))[0];
        const housingUnitsSingleCell = workbook.Sheets[housingUnitsSheet][housingUnitsCell] || null;
        if (housingUnitsSingleCell) {
          // override formula
          if (housingUnitsSingleCell.f) {
            // console.log('formula related to the cell');
            // override any formula
          }
          housingUnitsSingleCell.f = null;

          // override value
          if (housingUnitsSingleCell.v !== housingUnits) {
            // console.log('value override alert');
          }
          housingUnitsSingleCell.v = housingUnits;
        }

        // recalc the spreadsheet using formula
        calcWorkbook(workbook);
      }
      inputs.concat(outputs).forEach((item) => {
        // in case no value in the excel;
        if (!workbook || !workbook.Sheets || !workbook.Sheets[item.sheet][item.cell]) {
          workbook.Sheets[item.sheet][item.cell] = { t: 'n', v: undefined, f: undefined, z: 'General' };
        }
        item.value = setValue(workbook, item.sheet, item.cell);
        item.f = workbook.Sheets[item.sheet][item.cell].f || null;
        item.z = workbook.Sheets[item.sheet][item.cell].z || null;
      });
      const inputCates = setInputCates(inputs);

      if (!selectedCate) {
        return {
          ...state,
          workbook,
          inputs,
          outputs,
          inputCates,
          selectedCate: inputCates[0],
        };
      }

      return {
        ...state,
        workbook,
        inputs,
        outputs,
        inputCates,
      };
    }
    case ALL_RESET:
    case SCENARIO_RESET:
    case PROFORMA_RESET:
      return initialState;
    case CATE_SET:
      return { ...state, selectedCate };
    default:
      return state;
  }
};
