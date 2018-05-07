import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SnackMessage from './SnackMessage';
import { minusStep, addStep, setGeometryHeight } from '../../../reducers/map/actions';

import { RootState } from '../../../types';
import { Dispatch } from '../../../types/redux';
import { toggleApp } from '../../../reducers/app/actions';

const mapStateToProps = ({
  message,
}: RootState) => ({
  message,
});

const SnackMessageContainer = connect(mapStateToProps, null)(SnackMessage);
export default SnackMessageContainer;
