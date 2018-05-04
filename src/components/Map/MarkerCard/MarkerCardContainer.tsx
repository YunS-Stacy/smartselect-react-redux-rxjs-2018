import * as React from 'react';
import { connect } from 'react-redux';

import MarkerCard from './MarkerCard';

import { RootState } from '../../../types';

const mapStateToProps = ({ marker }: RootState) => ({
  marker,
});

const MarkerCardContainer = connect(mapStateToProps)(MarkerCard);
export default MarkerCardContainer;
