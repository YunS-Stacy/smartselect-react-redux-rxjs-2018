import * as React from 'react';

import Paper from 'material-ui/Paper';
import { Spin } from 'antd';
import { View } from '@antv/data-set';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape } from 'bizcharts';
import { RootState } from '../../types';
import QuerySlider from './QuerySlider';
const paperStyle = {
  // position: 'absolute',
  top: '75vh',
  left: '0',
  width: '50vw',
  height: '25vh',
  // right: '17em',
  backgroundColor: 'rgba(255,255,255,0.8)',
  zIndex: 9,
};

interface Props {
  slider: RootState['slider'];

  handleFetchData: (payload: string) => void;
}
class MapLegend extends React.Component<Props> {
  componentDidMount() {
    this.props.handleFetchData('slider');
  }
  render() {
    if (this.props.slider.data) {
      const scale = {
        fieldName: 'count',
        scaleConnfig: {
          alias: 'Count',
          nice: true,
          formatter: (val: number) => `$${val.toFixed(0)}`,
        },
      };
      return (
        <div className="map-legend" >
          <QuerySlider />
        </div>
      );
    }
    return null;
  }
}

export default MapLegend;
