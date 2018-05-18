import * as React from 'react';
import * as createG2 from 'g2-react';
import { Spin } from 'antd';
import { ChartData } from '../../types';

const Chart = createG2((chart: any) => {
  chart.coord('polar', { radius: 0.7 });
  chart.axis('valueChange', {
    labels: null,
    tickLine: null,
    line: null,
    grid: null,
  });
  chart.axis('Region_Name', {
    labels: {
      label: {
        fontSize: '8px',
        textAlign: 'end',
      },
    },
  });
  chart.legend(false);
  chart.tooltip(true, {
    offset: -150,
  });

  chart.interval().position('Region_Name*valueChange')
    .color('monthYear', 'rgb(12, 44, 132)-rgb(34, 94, 168)-rgb(29, 145, 192)-rgb(65, 182, 196)-rgb(127, 205, 187)')
    .opacity(0.2)
    .style({
      lineWidth: 0.03,
      stroke: '#fff',
    });
  chart.render();
});

const RosePlot = ({ data, fetched }: ChartData) => (
  <Spin
    spinning={fetched !== true}
    wrapperClassName="article-chart-spin"
  >
    <Chart
      data={data || []}
      forceFit={false}
      height={window.innerWidth / 2.5}
      width={window.innerWidth / 2.5}
      plotCfg={{
        margin: [50, 50, 50, 50],
      }}
    />
  </Spin>
);

export default RosePlot;
