import * as React from 'react';

import QuerySlider from './QuerySlider';

interface Props {
  step: number;
  handleInitMap: (container: HTMLDivElement) => void;
  handleFetchData: (payload: string) => void;
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
    >
    {this.props.step === 1 && <QuerySlider handleFetchData={this.props.handleFetchData}/>}
    </div>);
  }
}

export default Map;
