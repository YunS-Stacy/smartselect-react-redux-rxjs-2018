import * as React from 'react';
import { connect } from 'react-redux';

import MapMask from './MapMask';
import { toggleApp } from '../../reducers/app/actions';
import { initMap } from '../../reducers/map/actions';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';

const mapStateToProps = ({
  app,
}: RootState) => ({
  app,
});

const MapMaskContainer = connect(mapStateToProps)(MapMask);
export default MapMaskContainer;
