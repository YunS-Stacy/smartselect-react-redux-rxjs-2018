import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QuerySlider from './QuerySlider';

import { RootState } from '../../../types';
import { Dispatch } from '../../../types/redux';
import { fetchData } from '../../../reducers/app/actions';

const mapStateToProps = (
  { slider }: RootState,
  { handleFetchData }: { handleFetchData: (payload: string) => void },
) => ({
  slider,
  handleFetchData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetchData: bindActionCreators(fetchData, dispatch),
});

const QuerySliderContainer = connect(mapStateToProps, mapDispatchToProps)(QuerySlider as any);
export default QuerySliderContainer;
