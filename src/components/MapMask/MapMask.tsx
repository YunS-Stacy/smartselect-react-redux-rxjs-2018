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
          fontSize: '5em',
          whiteSpace: 'nowrap',
          fontWeight: 100,
        }}
    >
        About Model
    </h2>
  {...children}
    <a className="icon-wrapper" href="#model-selection">
      <Icon type="down" className="mask-icon" />
    </a>
  </div>
);

export default MapMask;
