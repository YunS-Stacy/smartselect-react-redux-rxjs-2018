import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// tslint:disable:no-import-side-effect
// side-effect imports here
import './styles/sass/main.scss';

injectTapEventPlugin();

import { Provider } from 'react-redux';
import App from './App';

import { store, epicMiddleware } from './store/store';
import { registerServiceWorker } from './registerServiceWorker';
registerServiceWorker();

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
  renderRoot((
    <App store={store} />
  ));
} else { // removed in production, hot-reload config
  // tslint:disable-next-line:no-var-requires
  const AppContainer = require('react-hot-loader').AppContainer;
  renderRoot((
    <AppContainer>
      <App store={store} />
    </AppContainer>
  ));

  if (module.hot) {
    // app
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      // tslint:disable-next-line
      console.log('HMR accept components replacement');
      renderRoot((
        <AppContainer>
          <NextApp store={store}/>
        </AppContainer>
      ));
    });
  }
}
