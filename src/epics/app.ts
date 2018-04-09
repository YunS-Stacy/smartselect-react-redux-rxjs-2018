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
