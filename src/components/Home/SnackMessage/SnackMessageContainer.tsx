import { connect } from 'react-redux';
import SnackMessage from './SnackMessage';

import { RootState } from '../../../types';

const mapStateToProps = ({
  message,
}: RootState) => ({
  message,
});

const SnackMessageContainer = connect(mapStateToProps, null)(SnackMessage);
export default SnackMessageContainer;
