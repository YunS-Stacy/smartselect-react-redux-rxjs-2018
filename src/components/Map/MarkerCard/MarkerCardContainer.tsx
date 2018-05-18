import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MarkerCard from './MarkerCard';

import { RootState } from '../../../types';
import { Dispatch } from '../../../types/redux';
import { fetchPopup } from '../../../reducers/popup/actions';

const mapStateToProps = ({ marker, popup: { fetched, id } }: RootState) => ({
  marker,
  fetched,
  // indicates whether popup is fetched and set
  isPopup: fetched && !!id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetchPopup: bindActionCreators(fetchPopup, dispatch),
});
const MarkerCardContainer = connect(mapStateToProps, mapDispatchToProps)(MarkerCard);
export default MarkerCardContainer;
