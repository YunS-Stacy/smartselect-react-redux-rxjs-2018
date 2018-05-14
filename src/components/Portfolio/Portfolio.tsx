import * as React from 'react';
import Frame from 'react-frame-component';
import Layout from '../Layout';

const Portfolio = ({ match: { path, params: { type } } }: any) => (
  <div
    className={`app-container`}
  >
    <Layout path={path}>
      {/design/i.test(type) && <Frame
        style={{ width: '100%',height:'92vh', border: '0', margin: 'auto' }}
        initialContent={`
          <!DOCTYPE html>
          <html>
            <head></head>
            <body style="margin: 0">
              <div data-configid="22809099/41527839" class="issuuembed" style="height: 100vh; overflow: hidden"></div>
              <script type="text/javascript" src="https://e.issuu.com/embed.js"></script>
            </body>
          </html>
        `
        }
      />}
      {!/design/i.test(type) && <Frame
        style={{ width: '100%',height:'92vh', border: '0', margin: 'auto' }}
        initialContent={`
          <!DOCTYPE html>
          <html>
            <head></head>
            <body style="margin: 0">
              <div data-configid="22809099/47345258" class="issuuembed" style="height: 100vh; overflow: hidden"></div>
              <script type="text/javascript" src="https://e.issuu.com/embed.js"></script>
            </body>
          </html>
        `
        }
      />}
    </Layout>
  </div>
);

export default Portfolio;
