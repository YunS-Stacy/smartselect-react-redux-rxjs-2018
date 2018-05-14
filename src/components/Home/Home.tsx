import * as React from 'react';

import { RootState } from '../../types';
import Layout from '../Layout';

import SnackMessage from './SnackMessage';
import MainBtn from '../MainBtn';
import Map from '../Map';
import MapMask from '../MapMask';
import MapPanel from '../MapPanel';
import ArticleProject from '../ArticleProject';

import ArticleCorrelation from '../ArticleCorrelation';
import ArticleModels from '../ArticleModels';
import ArticleWorkflow from '../ArticleWorkflow';
import ArticleMarket from '../ArticleMarket';

interface Props {
  app: boolean;
}

const Home = ({ app }: Props) => (
  <div
    className={`app-container${app ? ' fullscreen' : ''}`}
  >
    <Layout hidden={app}>
      <div className="map-container">
        {app ? <MapPanel /> : (
          <MapMask>
            <MainBtn />
          </MapMask>
        )}
        <Map />
        <SnackMessage />
      </div>
      {!app && (
        <>
          <ArticleProject />
          <ArticleMarket />
          <ArticleCorrelation />
          <ArticleModels />
          <ArticleWorkflow />
        </>
      )}
    </Layout>
  </div>
);

export default Home;
