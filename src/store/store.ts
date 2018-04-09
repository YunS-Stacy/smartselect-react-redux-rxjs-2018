
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import epics from '../epics';
import reducers from '../reducers';

import { IDENTITY_GET } from '../constants/action-types';
import { RootState } from '../types';

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    serialize: {
      options: {
        map: true,
        set: true,
      },
    },
  }) // serialize ES6 Map/Set native object
) || compose;

export const epicMiddleware = createEpicMiddleware(epics);

function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [epicMiddleware];

  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  const store = createStore(
    reducers,
    initialState!,
    enhancer
  );

  return store;
}

export const store = configureStore();

if (module.hot) {
  // reducers
  module.hot.accept('../reducers/index', () => {
    const newRootReducer = require('../reducers').default;
    // tslint:disable-next-line
    console.log('HMR accept reducers replacement');
    store.replaceReducer(newRootReducer);
  });

  // epics
  module.hot.accept('../epics/index', () => {
    const newRootEpic = require('../epics').default;
    // tslint:disable-next-line
    console.log('HMR accept epics replacement');
    epicMiddleware.replaceEpic(newRootEpic);
  });
}

export default store;
