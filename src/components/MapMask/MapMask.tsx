import * as React from 'react';

interface Props {
  app: boolean;
}

const MapMask = ({ app }: Props) => (
  <div
    className="map-mask"
    hidden={app}
  />
);

export default MapMask;
