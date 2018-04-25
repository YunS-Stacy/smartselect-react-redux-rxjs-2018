import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapPanel from './MapPanel';
import { minusStep, addStep } from '../../reducers/map/actions';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';
import { toggleApp } from '../../reducers/app/actions';

const mapStateToProps = ({
  map: { step, loaded, geometry },
}: RootState) => ({
  step,
  loaded,
  geometry,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleMinusStep: bindActionCreators(minusStep, dispatch),
  handleAddStep: bindActionCreators(addStep, dispatch),
  handleToggleApp: bindActionCreators(toggleApp, dispatch),
});

const MapPanelContainer = connect(mapStateToProps, mapDispatchToProps)(MapPanel);
export default MapPanelContainer;
