import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ hidden, children, path }: any) => (
  <MuiThemeProvider>
    <>
      {!hidden && <Nav path={path}/>}
      {children}
      {!hidden && <Footer />}
    </>
  </MuiThemeProvider>
);

export default Layout;
