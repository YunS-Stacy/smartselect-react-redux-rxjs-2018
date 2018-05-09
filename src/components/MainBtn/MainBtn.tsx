import * as React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import { Button } from 'antd';

interface Props {
  loaded: boolean;
  handleToggleApp: () => void;
}

const MainBtn = ({ loaded, handleToggleApp }: Props) => (
  <div className="main-btn-wrapper">
  {loaded === true ? (
  <Button
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      handleToggleApp();
    }}
    className="main-btn"
  >
    GET STARTED
  </Button>
  ) : (
    <RefreshIndicator
      size={60}
      left={-30} // width / 2
      top={0} // height / 2
      status="loading"
    />
  )}
  </div>
);

export default MainBtn;
