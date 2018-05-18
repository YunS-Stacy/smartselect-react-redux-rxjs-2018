import * as React from 'react';
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
            {`It can be observed that in Philadelphia,
            the local housing market maintains a healthy state in recent years, which reflects a stable housing demand.
          Location is, unsprisingly, an important factor.
          The house prices vary wildly from one neighborhood to another.`}
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
