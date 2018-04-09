import * as React from 'react';

interface Props {
  handleInitMap: (container: HTMLDivElement) => void;
}

const Map = ({ handleInitMap }: Props) => (
  <div
    id="map"
    ref={el => handleInitMap(el)}
  />
);

export default Map;
