import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainBtn from './MainBtn';
import { toggleApp } from '../../reducers/app/actions';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';

const mapStateToProps = ({
  app,
}: RootState) => ({
  app,
  loaded: true,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleToggleApp: bindActionCreators(toggleApp, dispatch),
});

const MainBtnContainer = connect(mapStateToProps, mapDispatchToProps)(MainBtn);
export default MainBtnContainer;
