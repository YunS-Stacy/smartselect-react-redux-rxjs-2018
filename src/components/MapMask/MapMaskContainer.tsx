import { connect } from 'react-redux';

import MapMask from './MapMask';

import { RootState } from '../../types';

const mapStateToProps = ({
  app,
}: RootState) => ({
  app,
});

const MapMaskContainer = connect(mapStateToProps)(MapMask);
export default MapMaskContainer;
