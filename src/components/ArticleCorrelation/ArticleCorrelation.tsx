import * as React from 'react';
import * as createG2 from 'g2-react';

import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
const OverPack = ScrollAnim.OverPack;

import { Spin } from 'antd';

interface Props {
  fetched: boolean | string;
  data?: any[];
}

const Chart = createG2((chart: any) => {
  chart.cols({
    Variable1: {
      type: 'cat',
      alias: 'Variables-xAxis',
    },
    Variable2: {
      type: 'cat',
      alias: 'Variables-yAxis',
    },
    COEF: {
      type: 'linear',
      alias: 'Coefficient',
      min: -1,
      max: 1,
      formatter: (datum: number) => datum.toFixed(2),
    },
  });

  chart.axis('Variable1', {
    labels: {
      label: null,
    },
    grid: {
      line: {
        stroke: '#d9d9d9',
        lineWidth: 1,
        lineDash: [2, 2],
      },
    },
    tickLine: null,
    titleOffset: 10,
  });

  chart.axis('Variable2', {
    labels: {
      label: null,
    },
    tickLine: null,
    titleOffset: 10,
  });
  chart.tooltip({
    title: null,
    offset: 0,
  });
  chart.legend('COEF', {
    position: 'right',
    height: 100,
    width: 10,
  });
  chart.polygon().position('Variable1*Variable2').color('COEF', 'rgb(254, 190, 18)-#f7f7f7-rgb(29, 145, 192)')
    .size('COEF', 0, 0.5)
    .style({
      cursor: 'pointer',
      lineWidth: 1,
      stroke: '#fff',
    }).tooltip('Variable1*Variable2*COEF');
  chart.render();
});

const ArticleCorrelation = ({ fetched, data }: Props) => (
  <article
    className="article-wrapper"
    id="correlation-wrapper"
  >
    <OverPack
      location="correlation-wrapper"
    >
      <QueueAnim
        key="overpack-wrapper"
        leaveReverse={true}
        className="article-body"
      >
        <div
          key="queue-body"
          className="article-main"
        >
          <h3 className="article-heading">
            Correlation Matrix
          </h3>
          <p className="article-text">
            {`Built a large dataset, it's time to find the least variables that describe the apartment price best.

              To find the relationship between variables, the correlation matrix may serve the goal well.`}
          </p>
        </div>
        <Spin
          spinning={fetched !== true}
          key="queue-chart"
          wrapperClassName="article-chart-spin"
        >
          <Chart
            className="article-chart"
            data={data}
            forceFit={false}
            width={(window.innerWidth - 320) / 2}
            height={(window.innerWidth - 420) / 2}
            plotCfg={{
              margin: [0, 150, 150, 50],
            }}
          />
        </Spin>
      </QueueAnim>
    </OverPack>
  </article>
);

export default ArticleCorrelation;
