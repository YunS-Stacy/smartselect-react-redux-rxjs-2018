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

interface Props {
  app: boolean;
}

const Home = ({ app }: Props) => (
  <MuiThemeProvider>
    <div className="app-container">
      <Layout>
        <section className="map-container">
          {app ? <MapPanel /> : (
            <MapMask>
              <MainBtn />
            </MapMask>
          )}
          <Map />
          <SnackMessage />
        </section>
        <ModelSelection />
      </Layout>
    </div>
  </MuiThemeProvider>
);

export default Home;
