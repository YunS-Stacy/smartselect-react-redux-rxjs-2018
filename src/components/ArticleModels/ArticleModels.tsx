import * as React from 'react';
import g2, { Stat, Frame } from 'g2';
import * as createG2 from 'g2-react';

import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
import { Spin } from 'antd';

const OverPack = ScrollAnim.OverPack;

import { RootState } from '../../types';

interface Props {
  fetched: boolean | string;
  data?: any[];

  handleFetchData: (payload: string) => void;
}
const data = [
  {
    Methods: 'OLS Regression',
    'R Squared': 0.65,
    MSE: 0.2,
    RMSE: 0.45,
  },
  {
    Methods: 'Gradient Boosting',
    'R Squared': 0.77,
    MSE: 0.13,
    RMSE: 0.36,
  },
  {
    Methods: 'Random Forests',
    'R Squared': 0.79,
    MSE: 0.12,
    RMSE: 0.35,
  },
];

const frame: any = Frame.combinColumns(new Frame(data), ['MSE', 'RMSE', 'R Squared'], 'Index', 'type', 'Methods')
  .toJSON();

const Chart = createG2((chart: any) => {
  chart.cols({
    Index: { min: 0 },
    Methods: { alias: 'Model Type' },
  });
  chart.intervalDodge().position('Methods*Index').color('type', 'rgb(254, 190, 18)-rgb(29, 145, 192)');
  chart.render();
});

const ArticleModels = () => (
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

        <Chart
          key="queue-chart"
          className="article-chart"
          data={frame || []}
          forceFit={false}
          width={window.innerWidth / 2}
          height={window.innerWidth / 2}
          plotCfg={{
            margin: [0, 150, 150, 50],
          }}
        />
      </QueueAnim>
    </OverPack>
  </article>
);

export default ArticleModels;
