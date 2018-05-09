import * as React from 'react';

import Footer from './Footer';
import Nav from './Nav';

const Layout = (props: any) => (
  <>
    <Nav />
    {props.children}
    <Footer />
  </>
);

export default Layout;
