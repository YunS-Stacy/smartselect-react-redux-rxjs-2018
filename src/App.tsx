import * as React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Portfolio from './components/Portfolio';

interface Props {
  store: any;
}

const App = ({ store }: Props) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/portfolio/:type" component={Portfolio} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
