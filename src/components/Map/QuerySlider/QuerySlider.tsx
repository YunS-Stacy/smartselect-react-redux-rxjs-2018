import * as React from 'react';

import Paper from 'material-ui/Paper';

import { RootState } from '../../../types';
import { Stat, Frame } from 'g2';
import * as createG2 from 'g2-react';

const legendArray = [
  [0, 'transparent'],

  [69100, 'rgba(12, 44, 132, 1)'],
  [94200, 'rgba(34, 94, 168, 1)'],
  [119000, 'rgba(29, 145, 192, 1)'],
  [141167, 'rgba(65, 182, 196, 1)'],
  [166690, 'rgba(127, 205, 187, 1)'],
  [191400, 'rgba(254, 190, 18, 1)'],
  [225682, 'rgba(238, 131, 110, 1)'],
  [285000, 'rgba(232, 92, 65, 1)'],
  [386940, 'rgba(219, 58, 27, 1)'],
  [600000, 'rgba(170, 45, 23, 1)']];

const legendChildren = legendArray.map((item, i) => {
  return (
    <li
      key={i}
      style={{
        borderTopColor: item[1],
        borderTopWidth: '5px',
        borderTopStyle: 'solid',
        fontSize: '.7rem',
        width: '8.5%',
        padding: 0,
        display: 'inline-block',
        textAlign: 'end',
        lineHeight: '2.4rem',
      }}
    >
      {`$${item[0]}`}
    </li>
  );
});
interface Props {
  slider: RootState['slider'];

  handleFetchData: (payload: string) => void;
  handleSetSliderRange: (payload: number[]) => void;
}

class QuerySlider extends React.Component<Props> {
  public Chart: any;
  public chart: any;
  public chartEl: any;

  constructor(props: any) {
    super(props);
    this.Chart = createG2((chart: any) => {
      this.chart = chart;
      chart.col('refprice', {
        alias: 'Reference Price',
        nice: true,
        formatter: (val: number) => {
          return '$' + val.toFixed(0);
        },
      });
      chart.axis('..count', {
        tickLine: null,
        titleOffset: 48,
      });
      chart.axis('refprice', {
        titleOffset: 35,
      });
      chart.cols({
        '..count': {
          tickCount: 3,
        },
      });
      chart.tooltip({
        title: null,
        map: {
          name: 'Price',
          value: 'refprice',
        },
        crosshairs: true,
      });
      chart.setMode('select');
      chart.select('rangeX');
      chart.line().position(Stat.summary.count(Stat.bin.dot('refprice', 0.01))).shape('smooth').color('#1D91C0');
      chart.area().position(Stat.summary.count(Stat.bin.dot('refprice', 0.01))).shape('smooth').color('#1D91C0');
      chart.render();
      chart.on('rangeselectend', (ev: any) => {
        // avoid miss
        if (ev.selected.refprice) {
          this.props.handleSetSliderRange(ev.selected.refprice);
        }
      });
    });
  }

  componentDidMount() {
    this.props.handleFetchData('slider');
  }

  render() {
    if (this.props.slider.data) {
      const frame = new Frame(this.props.slider.data);
      const filterData = Frame.filter(frame, (obj: any)  => obj.refprice < 600000);
      const tempData = Frame.sort(filterData, 'refprice');
      const data = tempData.toJSON();

      return (
        <Paper
          zDepth={3}
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            width: '50vw',
            height: '25vh',
            backgroundColor: 'rgba(255,255,255,0.8)',
            zIndex: 9,
          }}
          className="slider-chart-wrapper"
        >
        <div className="slider-chart">
          <this.Chart
            data={data}
            height={130}
            width={400}
            plotCfg={{ margin: [10, 30, 40, 60] }}
            forceFit={true}
          />
          </div>
          <div
            className="map-legend"
            style={{
              position: 'relative',
              paddingLeft: '0',
              bottom: '1rem',
              width: '100%',
            }}
          >
            <h5 style={{ paddingLeft: '3.75rem', lineHeight: '1.8rem' }}>Legend</h5>
            <ul style={{ paddingLeft: 0 }}>
              {legendChildren}
            </ul>
          </div>
        </Paper>
      );
    }
    return null;
  }
}

export default QuerySlider;
