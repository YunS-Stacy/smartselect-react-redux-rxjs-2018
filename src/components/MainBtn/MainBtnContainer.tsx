import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainBtn from './MainBtn';
import { toggleApp } from '../../reducers/app/actions';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';

const mapStateToProps = ({
  app,
  map: { loaded },
}: RootState) => ({
  app,
  loaded,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleToggleApp: bindActionCreators(toggleApp, dispatch),
});

const MainBtnContainer = connect(mapStateToProps, mapDispatchToProps)(MainBtn);
export default MainBtnContainer;
