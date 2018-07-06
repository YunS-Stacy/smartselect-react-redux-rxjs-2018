import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// tslint:disable:no-import-side-effect
// side-effect imports here
import './styles/sass/main.scss';

import App from './App';

import store from './store';
import * as LogRocket from 'logrocket';

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
  // install service worker if it is a production build
  OfflinePluginRuntime.install();
  LogRocket.init('o2z2ah/smartselect');

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
