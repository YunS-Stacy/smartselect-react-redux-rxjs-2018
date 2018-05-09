import * as React from 'react';
// import { Link } from 'dva/router';
import { Row, Col } from 'antd';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import Popover from 'material-ui/Popover';

const btnStyle = {
  maxHeight: '2.5rem',
};

const Nav = () => (
  <nav
    style={{
      minHeight: '3rem',
      padding: '.25rem',
      display: 'flex',
    }}
  >
    <RaisedButton style={btnStyle}>
      Home
    </RaisedButton>
    <RaisedButton
      style={{ ...btnStyle, marginLeft: '1rem' }}
    >
      Portfolio
    </RaisedButton>
    <DropDownMenu
      selectedMenuItemStyle={{ color: '#158cba' }}
      value={'portfolio'}
      // value={props.portName}
      // onChange={(e, value) => {
      //   e.preventDefault();
      //   props.dispatch({ type: 'smartselect/changePortfolio', portName: value === 0 ? 'design' : 'analysis' });
      // }}
    >
      <MenuItem value={'design'} primaryText="Urban Design + Planning" />
      <MenuItem value={'analysis'} primaryText="Geospatial Analysis" />
    </DropDownMenu>
  </nav>
);

export default Nav;
