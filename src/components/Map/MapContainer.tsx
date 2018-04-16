import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Map from './Map';
import { toggleApp } from '../../reducers/app/actions';
import { initMap } from '../../reducers/map/actions';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleToggleApp: bindActionCreators(toggleApp, dispatch),
  handleInitMap: bindActionCreators(initMap, dispatch),
});

const MapContainer = connect(null, mapDispatchToProps)(Map);
export default MapContainer;
