import * as React from 'react';
import g2, { Frame } from 'g2';
import * as createG2 from 'g2-react';

import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
const OverPack = ScrollAnim.OverPack;

import SpiralPlot from './SpiralPlot';
import RosePlot from './RosePlot';

interface Props {
  fetched: boolean;
  city: any[];
  region: any[];
}

const ArticleMarket = ({ fetched, city, region }: Props) => (
  <article
    className="article-wrapper"
    id="market-wrapper"
  >
    <OverPack
      location="market-wrapper"
    >
      <QueueAnim
        key="overpack-wrapper"
        leaveReverse={true}
        className="article-body column"
      >
        <div
          key="queue-body"
          className="article-main"
        >
          <h3 className="article-heading">
             Market
          </h3>
          <p className="article-text">
            {`Built a large dataset, it's time to find the least variables that describe the apartment price best.

              To find the relationship between variables, the market matrix may serve the goal well.`}
          </p>
        </div>
        <div className="article-inline-charts" key="queue-chart">
          <SpiralPlot fetched={fetched} data={region}/>
          <RosePlot fetched={fetched} data={city}/>
        </div>

      </QueueAnim>
    </OverPack>
  </article>
);

export default ArticleMarket;
