import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapPanel from './MapPanel';
import { minusStep, addStep, setGeometryHeight } from '../../reducers/map/actions';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';
import { toggleApp } from '../../reducers/app/actions';

const mapStateToProps = ({
  map: { step, loaded, geometry },
  slider: { range },
}: RootState) => ({
  range,
  step,
  loaded,
  geometry,
  height: geometry.find(item => item.geometry.type === 'Polygon')
  && geometry.find(item => item.geometry.type === 'Polygon').properties.height,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleMinusStep: bindActionCreators(minusStep, dispatch),
  handleAddStep: bindActionCreators(addStep, dispatch),
  handleToggleApp: bindActionCreators(toggleApp, dispatch),
  handleSetGeometryHeight: bindActionCreators(setGeometryHeight, dispatch),
});

const MapPanelContainer = connect(mapStateToProps, mapDispatchToProps)(MapPanel);
export default MapPanelContainer;
