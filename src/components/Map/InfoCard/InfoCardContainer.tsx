import * as React from 'react';
import { connect } from 'react-redux';

import InfoCard from './InfoCard';

import { RootState } from '../../../types';

const mapStateToProps = ({ popup: { data, fetched } }: RootState) => ({
  fetched,
  data: data && data[0],
});

const InfoCardContainer = connect(mapStateToProps)(InfoCard);
export default InfoCardContainer;
