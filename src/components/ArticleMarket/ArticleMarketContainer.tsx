import { connect } from 'react-redux';
import { RootState } from '../../types';

import ArticleMarket from './ArticleMarket';

const mapStateToProps = ({
  market: { fetched, data: { city, region } },
}: RootState) => ({
  fetched, city, region,
});

const ArticleMarketContainer = connect(mapStateToProps)(ArticleMarket);
export default ArticleMarketContainer;
