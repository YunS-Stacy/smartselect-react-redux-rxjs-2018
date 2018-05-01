import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../types';
import Home from './Home';

const mapStateToProps = ({
  app, map: { step },
}: RootState) => ({
  app, step,
});

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;
