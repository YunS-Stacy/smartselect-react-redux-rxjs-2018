import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dispatch } from '../../types/redux';
import { RootState } from '../../types';
import ArticleCorrelation from './ArticleCorrelation';
import { fetchData } from '../../reducers/app/actions';

const mapStateToProps = ({
  correlation: { fetched, data },
}: RootState) => ({
  fetched, data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetchData: bindActionCreators(fetchData, dispatch),
});

const ArticleCorrelationContainer = connect(mapStateToProps, mapDispatchToProps)(ArticleCorrelation as any);
export default ArticleCorrelationContainer;
