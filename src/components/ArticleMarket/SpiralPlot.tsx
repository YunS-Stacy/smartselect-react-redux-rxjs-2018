import * as React from 'react';
import { Shape } from 'g2';
import * as createG2 from 'g2-react';
import { Spin } from 'antd';
import { ChartData } from '../../types';

const Chart = createG2((chart: any) => {
  chart.cols({
    valueChange: {
      type: 'linear',
      min: 94,
      max: 125,
      alias: 'Median House Price',
    },
  });
  chart.coord('helix', {
    startAngle: Math.PI,
    endAngle: 15.334 * Math.PI,
  }).rotate(90);
  Shape.registShape('interval', 'max', {
    getShapePoints: (cfg: any) => {
      const x = cfg.x;
      const y0 = cfg.y0;
      const width = cfg.size;
      return [
        { x: x - width, y: y0 },
        { x: x - width, y: 1 },
        { x: x + width, y: 1 },
        { x: x + width, y: y0 },
      ];
    },
  });
  chart.tooltip({
    title: null,
    map: {
      name: 'monthYear',
      value: 'valueChange',
    },
  });

  chart.legend('valueChange', {
    position: 'right',
    width: 10,
    height: 200,
  });

  chart.axis('monthYear', {
    tickLine: null,
    line: null,
  });

  chart.interval().position('monthYear*valueChange')
    .color('valueChange', '#ffffff-rgb(29,145,192)')
    .opacity(0.8)
    .shape('max').
    label('monthYear', (monthYear: string) => {
      return monthYear.substring(0, 3);
    }, {
      label: {
        fontSize: '1',
        textBaseline: 'bottom',
      },
    });
  chart.render();
});

const SpiralPlot = ({ data, fetched }: ChartData) => (
  <Spin
    spinning={!fetched}
    wrapperClassName="article-chart-spin"
  >
    <Chart
      data={data || []}
      forceFit={false}
      height={window.innerWidth / 2.5}
      width={window.innerWidth / 2.5}
      plotCfg={{
        margin: [100, 150, 100, 50],
      }}
    />
  </Spin>
);

export default SpiralPlot;
