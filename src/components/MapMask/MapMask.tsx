import * as React from 'react';
import { Icon } from 'antd';

interface Props {
  app: boolean;
  children?: any;
}

const MapMask = ({ app, children }: Props) => (
  <div
    className="map-mask"
    hidden={app}
  >
    <h2
      style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '5rem',
        whiteSpace: 'nowrap',
        fontWeight: 100,
      }}
    >
      Smart Select
    </h2>
    {...children}
    <a className="icon-wrapper" href="#project-wrapper">
      <Icon type="down" className="mask-icon" />
    </a>
  </div>
);

export default MapMask;
