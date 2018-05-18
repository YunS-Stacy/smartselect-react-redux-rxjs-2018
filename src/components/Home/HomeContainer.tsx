import { connect } from 'react-redux';

import { RootState } from '../../types';
import Home from './Home';

const mapStateToProps = ({
  app,
}: RootState) => ({
  app,
});

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;
