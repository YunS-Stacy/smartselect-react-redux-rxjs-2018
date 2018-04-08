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

import { PROFORMA_SET, PROFORMA_RESET, PROFORMA_EXPORT, PROFORMA_IMPORT, CATE_SET } from '../../constants/action-types';

export interface SetProforma {
  type: PROFORMA_SET;
  [key: string]: any;
}

export interface ResetProforma {
  type: PROFORMA_RESET;
}

export interface SetCate {
  type: CATE_SET;
  selectedCate: string;
}

export type ProformaAction = SetProforma | ResetProforma | SetCate;

export function setProforma(payload: any): SetProforma {
  return {
    type: PROFORMA_SET,
    ...payload,
  };
}

export function resetProforma(): ResetProforma {
  return {
    type: PROFORMA_RESET,
  };
}

export function exportProforma(payload: object) {
  return {
    type: PROFORMA_EXPORT,
    ...payload,
  };
}

export function importProforma(payload: object) {
  return {
    type: PROFORMA_IMPORT,
    ...payload,
  };
}

export function setCate(selectedCate: string): SetCate {
  return {
    selectedCate,
    type: CATE_SET,
  };
}
