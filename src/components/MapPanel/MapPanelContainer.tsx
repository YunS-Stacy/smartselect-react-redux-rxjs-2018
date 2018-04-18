import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapPanel from './MapPanel';
import { minusStep, addStep } from '../../reducers/map/actions';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';

const mapStateToProps = ({
  map: { step },
}: RootState) => ({
  step,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleMinusStep: bindActionCreators(minusStep, dispatch),
  handleAddStep: bindActionCreators(addStep, dispatch),
});

const MapPanelContainer = connect(mapStateToProps, mapDispatchToProps)(MapPanel);
export default MapPanelContainer;
