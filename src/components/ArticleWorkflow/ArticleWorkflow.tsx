import * as React from 'react';
import g2, { Shape, Layout, Stat } from 'g2';
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

function renderTree(nodes: any, edges: any, dx: any, chart: any) {
  chart.clear();
  const height = Math.max(500, 26 / dx);
  chart.changeSize(1300, height);
  const edgeView = chart.createView();
  edgeView.source(edges);
  edgeView.coord().transpose().scale(1, -1);
  edgeView.axis(false);
  edgeView.tooltip(false);
  edgeView.edge()
    .position(Stat.link('source*target', nodes))
    .shape('smooth')
    .color('#ccc');
  function strLen(str: string) {
    let len = 0;
    for (let i = 0; i < str.length; i += 1) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        len += 1;
      } else {
        len += 2;
      }
    }
    return len;
  }
  const nodeView = chart.createView();
  nodeView.coord().transpose().scale(1, -1); // 'polar'
  nodeView.axis(false);
  nodeView.source(nodes, {
    x: { min: 0, max: 1 },
    y: { min: 0, max: 1 },
    value: { min: 0 },
  }, ['id', 'x', 'y', 'name', 'children', 'collapsed']);
  nodeView.point().position('x*y').color('steelblue').size('name', (name: string) => {
    const length = strLen(name);
    return length * 6 + 5 * 2;
  }).label('name', {
    offset: 6,
    labelEmit: true,
  })
    .shape('children*collapsed', (children: any, collapsed: any) => {
      if (children) {
        if (collapsed) {
          return 'collapsed';
        }
        return 'expanded';
      }
      return 'leaf';
    })
    .tooltip('name*id');
  chart.render();
}
function drawNode(cfg: any, group: any, collapsed: any, isLeaf?: any) {
  let x = cfg.x;
  const y = cfg.y;
  const pointSize = 5;
  const width = cfg.size;
  const height = 14;
  const label = cfg.label;
  const shape = group.addShape('rect', {
    attrs: {
      x: x,
      y: y - height / 2,
      width: width,
      height: height,
      fill: '#fff',
      cursor: isLeaf ? '' : 'pointer',
      stroke: cfg.color,
    },
  });
  if (!isLeaf) {
    x = x - pointSize;
    group.addShape('circle', {
      attrs: {
        r: pointSize,
        x: x,
        y: y,
        fill: '#fff',
        stroke: cfg.color,
      },
    });
    const path = [];
    path.push(['M', x - pointSize / 2, y]);
    path.push(['L', x + pointSize / 2, y]);
    if (collapsed) {
      path.push(['M', x, y - pointSize / 2]);
      path.push(['L', x, y + pointSize / 2]);
    }
    group.addShape('path', {
      attrs: {
        path: path,
        stroke: cfg.color,
      },
    });
  }
  return shape;
}
const Chart = createG2((chart: any) => {
  Shape.registShape('point', 'collapsed', {
    drawShape: (cfg: any, group: any) => drawNode(cfg, group, true),
  });
  Shape.registShape('point', 'expanded', {
    drawShape: (cfg: any, group: any) => drawNode(cfg, group, false),

  });
  Shape.registShape('point', 'leaf', {
    drawShape: (cfg: any, group: any) => drawNode(cfg, group, false, true),
  });

  const data = chart.get('data').data;
  const layout = new Layout.Tree({
    nodes: data,
  });
  let dx = layout.dx;
  let nodes = layout.getNodes();
  let edges = layout.getEdges();
  chart.animate(false);
  chart.tooltip({
    title: null,
  });
  chart.legend('children', false);
  chart.legend('name', false);
  renderTree(nodes, edges, dx, chart);
  chart.on('plotclick', (ev: any) => {
    const shape = ev.shape;
    if (shape) {
      const obj = shape.get('origin');
      const id = obj._origin.id;
      const node = layout.findNode(id);
      if (node && node.children) {
        node.collapsed = !node.collapsed ? 1 : 0;
        layout.reset();
        nodes = layout.getNodes();
        edges = layout.getEdges();
        dx = layout.dx;
        renderTree(nodes, edges, dx, chart);
      }
    }
  });
});

const data = [
  {
    name: 'Reference Price',
    children: [
      {
        name: 'Latest Transaction Price (Within 5 Years)',
      },
      {
        name: 'Predicted Price',
        children: [
          {
            name: 'Dataset Input',
            children: [
              {
                name: 'Data Source',
                children: [
                  {
                    name: 'OPA Property Record ',
                    children: [
                      {
                        name: 'SODA API -> CartoDB ',
                      },
                    ],
                  },
                  {
                    name: 'Zillow API',
                    children: [
                      {
                        name: 'Housing Condition',
                      },
                      {
                        name: 'ZPID ',
                      },
                    ],
                  },
                  {
                    name: 'OpenData Philly',
                    children: [
                      {
                        name: 'Location Factors',
                        children: [
                          {
                            name: 'Crime Data',
                          },
                          {
                            name: '311 Request',
                          },
                          {
                            name: 'Public Transit',
                          },
                          {
                            name: 'L&I Record',
                          },
                          {
                            name: 'Zoning',
                          },
                          {
                            name: 'Amenities',
                          },
                          {
                            name: 'School Catchment ',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Data Processing',
                children: [
                  {
                    name: 'CartoDB SQL Query ',
                    children: [
                      {
                        name: '"Type: Apartment" Address ',
                      },
                      {
                        name: '"Type: Vacant" Address ',
                      },
                      {
                        name: 'No Address ',
                      },
                    ],
                  },
                  {
                    name: 'Google Geocode API ',
                    children: [
                      {
                        name: 'Geocode Address ',
                      },
                    ],
                  },

                ],

              },
              {
                name: 'Generate constiables',
                children: [
                  {
                    name: 'ArcGIS ModelBuilder ',
                    children: [
                      {
                        name: 'Generate Near Table',
                        children: [
                          { name: 'Maximum Number of Closest: 1/3/5' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Feature Selection ',
            children: [
              {
                name: 'Numerical',
                children: [
                  {
                    name: 'Correlation Coefficient',
                  },
                  {
                    name: 'Boruta Feature Selection',
                  },

                ],
              },

              {
                name: 'Categorical',
                children: [
                  {
                    name: 'Boruta Feature Selection',
                  },
                ],
              },
            ],
          },
          {
            name: 'Model Selection',
            children: [
              {
                name: 'Method ',
                children: [
                  {
                    name: 'OLS Regression ',
                  },
                  {
                    name: 'Gradient Boosting ',
                  },
                  {
                    name: 'Random Forests ',
                  },
                ],
              },
              {
                name: 'Criteria',
                children: [
                  { name: 'Statistics Index' },
                  { name: 'K-Fold Cross-Validation' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const ArticleWorkflow = () => (
  <article
    className="article-wrapper"
    id="workflow-wrapper"
  >
    <div
      key="queue-body"
      className="article-main"
    >
      <h3 className="article-heading">Data Process</h3>
      <Chart
        data={data}
        forceFit={false}
        key="queue-chart"
        width={window.outerWidth / 3}
        height={window.outerWidth / 3}
        plotCfg={{
          margin: [0, 150, 150, 50],
        }}
      />
    </div>
  </article>
);

export default ArticleWorkflow;
