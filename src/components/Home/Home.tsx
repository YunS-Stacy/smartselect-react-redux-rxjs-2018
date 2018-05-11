import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { RootState } from '../../types';
import Layout from '../Layout';

import SnackMessage from './SnackMessage';
import MainBtn from '../MainBtn';
import Map from '../Map';
import MapMask from '../MapMask';
import MapPanel from '../MapPanel';
import ModelSelection from '../ModelSelection';
import ArticleCorrelation from '../ArticleCorrelation';
import ArticleModels from '../ArticleModels';
import ArticleWorkflow from '../ArticleWorkflow';
import ArticleMarket from '../ArticleMarket';

interface Props {
  app: boolean;
}

const Home = ({ app }: Props) => (
  <MuiThemeProvider>
    <div className="app-container">
      <Layout>
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
            <ArticleMarket />
            <ArticleCorrelation />
            <ArticleModels />
            <ArticleWorkflow />
          </>
        )}

      </Layout>
    </div>
  </MuiThemeProvider>
);

export default Home;
