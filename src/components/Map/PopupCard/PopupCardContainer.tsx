import * as React from 'react';
import { connect } from 'react-redux';

import PopupCard from './PopupCard';

import { RootState } from '../../../types';

const mapStateToProps = ({ popup: { data, id, position } }: RootState) => ({
  position,
  data: id && data.find(item => item.zpid === id),
});

const PopupCardContainer = connect(mapStateToProps)(PopupCard);
export default PopupCardContainer;
