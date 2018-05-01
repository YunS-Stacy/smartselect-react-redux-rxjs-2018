import * as React from 'react';

interface Props {
  step: number;
  handleInitMap: (container: HTMLDivElement) => void;
}

class Map extends React.Component<Props> {
  container: HTMLDivElement;

  componentDidMount() {
    this.props.handleInitMap(this.container);
  }

  render() {
    return (
      <div
        id="map"
        ref={el => this.container = el}
      />
    );
  }
}

export default Map;
