import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { RootState } from '../../types';

import MainBtn from '../MainBtn';
import Map from '../Map';
import MapMask from '../MapMask';
import MapPanel from '../MapPanel';

interface Props {
  app: boolean;
}

const Home = ({ app }: Props) => (
  <MuiThemeProvider>
    <div className="app-container">
      <section className="map-container">
        {!app && <MainBtn />}
        {!app && <MapMask />}
        <Map />
        {app && <MapPanel />}
      </section>
    </div>
  </MuiThemeProvider>
);

export default Home;
