import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StepperBtn from './StepperBtn';
// import { toggleApp } from '../../reducers/app/actions';
// import { initMap } from '../../reducers/map/actions';

import { RootState } from '../../../types';
import { Dispatch } from '../../../types/redux';

const mapStateToProps = ({
  map: { step },
}: RootState) => ({
  step,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   handleToggleApp: bindActionCreators(toggleApp, dispatch),
//   handleInitMap: bindActionCreators(initMap, dispatch),
// });

const StepperBtnContainer = connect()(StepperBtn);
export default StepperBtnContainer;
