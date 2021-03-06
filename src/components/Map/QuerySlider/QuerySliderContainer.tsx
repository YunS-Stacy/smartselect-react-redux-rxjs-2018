import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QuerySlider from './QuerySlider';

import { RootState } from '../../../types';
import { Dispatch } from '../../../types/redux';
import { fetchData } from '../../../reducers/app/actions';
import { setSliderRange } from '../../../reducers/slider/actions';

const mapStateToProps = (
  { slider }: RootState,
  { handleFetchData }: { handleFetchData: (payload: string) => void },
) => ({
  slider,
  handleFetchData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetchData: bindActionCreators(fetchData, dispatch),
  handleSetSliderRange: bindActionCreators(setSliderRange, dispatch),
});

const QuerySliderContainer = connect(mapStateToProps, mapDispatchToProps)(QuerySlider);
export default QuerySliderContainer;
