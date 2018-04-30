import * as React from 'react';

import { Spin } from 'antd';
import { View } from '@antv/data-set';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape } from 'bizcharts';
import { RootState } from '../../../types';

interface Props {
  slider: RootState['slider'];

  handleFetchData: (payload: string) => void;
}
class QuerySlider extends React.Component<Props> {
  componentDidMount() {
    this.props.handleFetchData('slider');
  }
  render() {
    if (this.props.slider.data) {
      const dv = new View().source(this.props.slider.data);

      dv.transform({
        type: 'sort-by',
        fields: ['refprice'],
        order: 'DESC',
      });

      dv.transform({
        type: 'bin.histogram',
        field: 'refprice',             // 对应数轴上的一个点
        bins: 30,               // 分箱个数
        binWidth: 10,           // 分箱步长（会覆盖bins选项）
            // 分组（用于层叠直方图）
        as: ['x', 'count'],   // x 为数组，存储了某个分箱的上下限 [x0, x1]
      });

      const scale = {
        fieldName: 'refprice',
        scaleConnfig: {
          alias: 'Reference Price',
          nice: true,
          formatter: (val: number) => `$${val.toFixed(0)}`,
        },
        // year: {
        //   range: [0, 1]
        // }
      };

      console.log(dv, 'dv');
      return (
        <Chart
          height={600}
          data={dv}
          padding={300}
          scale={scale}
          forceFit={true}
        >
          {/* <Tooltip crosshairs={true} /> */}
          <Axis />
          <Legend />
          <Geom type="area" position="refprice*value" color="type" shape="smooth" />
          <Geom type="line" position="year*value" color="type" shape="smooth"  size={2} />
        </Chart>
      // <Spin
      //   spinning={true}
      //   wrapperClassName="spinner leftPanel"
      //   // style={{top: '30vh', left: '-38vw', position: 'absolute'}}
      // >

      // </Spin>
      );
    }
    return null;
  }
}

export default QuerySlider;
