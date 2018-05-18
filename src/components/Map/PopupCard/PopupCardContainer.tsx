import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PopupCard from './PopupCard';

import { RootState } from '../../../types';
import { Dispatch } from '../../../types/redux';
import { fetchRoute } from '../../../reducers/route/actions';

const mapStateToProps = ({ popup: { data, id, position } }: RootState) => ({
  position,
  data: data && data.find(item => item.zpid === id),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetchRoute: bindActionCreators(fetchRoute, dispatch),
});

const PopupCardContainer = connect(mapStateToProps, mapDispatchToProps)(PopupCard);
export default PopupCardContainer;
