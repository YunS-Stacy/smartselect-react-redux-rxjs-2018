
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PanelBtns from './PanelBtns';

import { toggleApp } from '../../../reducers/app/actions';
import { minusStep, addStep } from '../../../reducers/map/actions';

import { RootState } from '../../../types';
import { Dispatch } from '../../../types/redux';

const mapStateToProps = ({
  map: { step },
}: RootState, { loaded, hasGeometry }: { loaded: boolean; hasGeometry?: boolean }) => ({
  step,
  loaded,
  hasGeometry,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleMinusStep: bindActionCreators(minusStep, dispatch),
  handleAddStep: bindActionCreators(addStep, dispatch),
  handleToggleApp: bindActionCreators(toggleApp, dispatch),
});

const PanelBtnsContainer = connect(mapStateToProps, mapDispatchToProps)(PanelBtns);
export default PanelBtnsContainer;
