import * as React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import Popover from 'material-ui/Popover';

const btnStyle = {
  maxHeight: '2.5rem',
};

interface Props {
  path?: string;
}
const Nav = ({ path }: Props) => (
  <nav className="nav-list">
    <span className="nav-link"><Link to="/">Home</Link></span>
    <span className="nav-link"><Link to="/portfolio/urban-planning+design">Paper Portfolio</Link></span>
    {/portfolio/i.test(path) &&
      <>
        <span className="nav-link sub"><Link to="/portfolio/urban-planning+design">Urban Planning + Design</Link></span>
        <span className="nav-link sub"><Link to="/portfolio/urban-spatial-analysis">Urban Spatial Analysis</Link></span>
      </>
    }
    {/* <RaisedButton
      // style={btnStyle}
      containerElement={<Link to="/" />}
      label="Home"
    />
    <RaisedButton
      // style={btnStyle}
      containerElement={<Link to="/portfolio" />}
      label="Portfolio"
    /> */}
    {/* <Link to="/">
      <RaisedButton
        style={{ ...btnStyle, marginLeft: '1rem' }}
      >
        Portfolio
      </RaisedButton>
    </Link>
    <DropDownMenu
      selectedMenuItemStyle={{ color: '#158cba' }}
      value={'portfolio'}
    >
      <MenuItem value={'design'} primaryText="Urban Design + Planning" />
      <MenuItem value={'analysis'} primaryText="Geospatial Analysis" />
    </DropDownMenu> */}
  </nav>
);

export default Nav;
