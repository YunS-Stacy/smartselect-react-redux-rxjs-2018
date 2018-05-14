import * as React from 'react';
import g2, { Stat, Frame } from 'g2';
import * as createG2 from 'g2-react';

import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
import { Spin } from 'antd';

const OverPack = ScrollAnim.OverPack;

import { RootState } from '../../types';

const contents = [
  ['About', `Smart Select is a web application that allows you to navigate through the city,
find your next investment opportunity of apartments, and ... build it!`],
  ['Problem', `Pro forma is EXHAUSTING, and the data sources are complicated to collect,
and may sometimes have a large proportion of the MISSING values.`],
  ['Solution', `The final model used only "LOCATION" factors as predictors.
Everyone will have an easy access to get a suggested price for a parcel!`],
];

const ArticleProject = () => (
  <article
    className="article-wrapper"
    id="project-wrapper"
  >
    <OverPack
      location="project-wrapper"
    >
      <div className="article-main" key="overpack-wrapper">
        <h3 className="article-heading">Project Background</h3>
        <QueueAnim
          leaveReverse={true}
          className="article-body"
          key="queue-body"
        >
        {contents.map(item => (
          <div
            key={`queue-body-${item[0]}`}
            className="article-column"
          >
            <h4 className="article-sub-heading">{item[0]}</h4>
            <p className="article-text">{item[1]}</p>
          </div>
        ))}
        </QueueAnim>
      </div>
    </OverPack>
  </article>
);

export default ArticleProject;
