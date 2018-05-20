import * as React from 'react';
import Layout from '../Layout';
const Portfolio = ({ match: { path, params: { type } } }: any) => (
  <div
    className="app-container"
  >
    <Layout path={path}>
      {/design/gi.test(type) &&
      <iframe
        style={{ width: '100%', height: '100vh' }}
        src="//e.issuu.com/embed.html#22809099/41527839"
        frameBorder="0"
        allowFullScreen={true}
      />}
      {!/design/gi.test(type) &&
      <iframe
        style={{ width: '100%', height: '100vh' }}
        src="//e.issuu.com/embed.html#22809099/47345258"
        frameBorder="0"
        allowFullScreen={true}
      />}
    </Layout>
  </div>
);

export default Portfolio;
