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
import { combineEpics, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import { APP_TOGGLE } from '../constants/action-types';
import { filter, map, mapTo, tap, throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { updateHighlights } from '../utils/highlights';
import { Store, Action } from '../types/redux';

const toggleAppEpic = (action$: ActionsObservable<Action>) => action$
.ofType(APP_TOGGLE)
.pipe(
  // tslint:disable-next-line
  tap(action => console.log(action, 'action')),
  mapTo({ type: 'TEST' })
);

// const selectionValidEpic = (action$: ActionsObservable<any>, store: Store) => action$
// .ofType(SELECTION_VALID)
// .pipe(
//   filter(() => store.getState().global.interactive),
//   // ignore abnormal click events
//   throttleTime(1200),
//   map(action => ({ ...action, type: SELECTION_SET }))
// );

// const interactiveEpic = (action$: ActionsObservable<any>) => action$
// .ofType(STEP_SET)
// .pipe(
//   // whenever step === 3, not interactive
//   filter(({ step }) => step === 3),
//   map(action => ({ type: INTERACTIVE_TOGGLE }))
// );

// const selectionSetEpic = (action$: ActionsObservable<any>) => action$
// .ofType(SELECTION_SET)
// .pipe(
//   tap(e => console.log(e, 'epic -selection set'))
// );

export const epics = combineEpics(
  toggleAppEpic
);
export default epics;
