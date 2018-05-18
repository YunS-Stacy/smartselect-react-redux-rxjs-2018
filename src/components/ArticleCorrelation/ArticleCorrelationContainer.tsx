import { connect } from 'react-redux';

import { RootState } from '../../types';
import ArticleCorrelation from './ArticleCorrelation';

const mapStateToProps = ({
  correlation: { fetched, data },
}: RootState) => ({
  fetched, data,
});

const ArticleCorrelationContainer = connect(mapStateToProps)(ArticleCorrelation);
export default ArticleCorrelationContainer;
