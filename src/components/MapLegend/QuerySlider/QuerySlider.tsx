import * as React from 'react';

import Paper from 'material-ui/Paper';
import { Spin } from 'antd';
import { View } from '@antv/data-set';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape } from 'bizcharts';

import * as Slider from 'bizcharts-plugin-slider';

import { RootState } from '../../../types';

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
class QuerySlider extends React.Component<Props> {
  componentDidMount() {
    this.props.handleFetchData('slider');
  }
  render() {
    return this.props.slider.data ? (
      <div>
        <Chart
          height={200}
          width={800}
          data={this.props.slider.data}
          padding={50}
          forceFit={false}
        >
          <Axis name="count" />
          <Axis name="price" label={{ formatter: val => `$${Number(val).toFixed(0)}` }} />
          <Tooltip crosshairs={{ type: 'x' }} />
          <Geom
            type="point"
            position="price*count"
            shape="circle"
            size={2}
            color={'price'}
          />
          {/* <Geom type="interval" position="price*count" /> */}
          {/* <Geom type="line" position="price*count" /> */}
        </Chart>
        <div>
          <Slider
            width="auto"
            height={26}
            // start={ds.state.start}
            // end={ds.state.end}
            xAxis="price"
            yAxis="count"
            // scales={{ time: { type: 'time', tickCount: 10, mask: 'M/DD H:mm' } }}
            data={this.props.slider.data}
            backgroundChart={{ type: 'point' }}
            onChange={(e: any) => console.log(e)}
          />
        </div>
      </div >
    ) : null;
  }
}

export default QuerySlider;
