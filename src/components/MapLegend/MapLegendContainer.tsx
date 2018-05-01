import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapLegend from './MapLegend';

import { RootState } from '../../types';
import { Dispatch } from '../../types/redux';
import { fetchData } from '../../reducers/app/actions';

const mapStateToProps = (
  { slider }: RootState,
) => ({
  slider,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetchData: bindActionCreators(fetchData, dispatch),
});

const MapLegendContainer = connect(mapStateToProps, mapDispatchToProps)(MapLegend as any);
export default MapLegendContainer;
