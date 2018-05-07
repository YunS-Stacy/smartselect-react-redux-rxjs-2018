import * as React from 'react';

import QuerySlider from './QuerySlider';
import InfoCard from './InfoCard';
import MarkerCard from './MarkerCard';
import PopupCard from './PopupCard';

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
    {this.props.step === 1 && <PopupCard/>}

    {this.props.step === 1 && <MarkerCard />}

    </div>);
  }
}

export default Map;
