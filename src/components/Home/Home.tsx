import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { RootState } from '../../types';

import MainBtn from '../MainBtn';
import Map from '../Map';
import MapMask from '../MapMask';

interface Props {
  app: boolean;
}

const Home = ({ app }: Props) => (
  <MuiThemeProvider>
    <div className="app-container">
      <section className="map-container">
        <MainBtn />
        <MapMask />
        <Map />
      </section>
    </div>
  </MuiThemeProvider>
);

export default Home;
