import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Map from './Map';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';
import { fetchData } from '../../reducers/app/actions';
import { initMap } from '../../reducers/map/actions';

const mapStateToProps = ({ map: { step }, popup: { data } }: RootState) => ({
  step,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleInitMap: bindActionCreators(initMap, dispatch),
  handleFetchData: bindActionCreators(fetchData, dispatch),
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(Map as any);
export default MapContainer;
