import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// tslint:disable:no-import-side-effect
// side-effect imports here
import './styles/sass/main.scss';

injectTapEventPlugin();

import { Provider } from 'react-redux';
import Home from './components/Home';

import { store } from './store/store';

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
  renderRoot((
    <Provider store={store}>
      <Home />
    </Provider>
  ));
} else { // removed in production, hot-reload config
  // tslint:disable-next-line:no-var-requires
  const AppContainer = require('react-hot-loader').AppContainer;
  renderRoot((
    <AppContainer>
      <Provider store={store}>
        <Home />
      </Provider>
    </AppContainer>
  ));

  if (module.hot) {
    // app
    module.hot.accept('./components/Home', () => {
      const NextApp = require('./components/Home').default;
      // tslint:disable-next-line
      console.log('HMR accept components replacement');
      renderRoot((
        <AppContainer>
          <Provider store={store}>
            <NextApp />
          </Provider>
        </AppContainer>
      ));
    });

    // // store
    // module.hot.accept('./store/store', () => {
    //   const nextStore = require('./store/store').default;
    //   // tslint:disable-next-line
    //   console.log('HMR accept store replacement');
    //   renderRoot((
    //     <AppContainer>
    //       <Provider store={nextStore}>
    //         <Home />
    //       </Provider>
    //     </AppContainer>
    //   ));
    // });
  }
}
