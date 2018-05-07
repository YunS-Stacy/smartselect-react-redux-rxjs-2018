import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import { Spin } from 'antd';

import DirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import DirectionsBike from 'material-ui/svg-icons/maps/directions-bike';
import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import IconButton from 'material-ui/IconButton';

interface Props {
  data?: any;
  id?: string;
  position?: mapboxgl.Point;
}

const btnStyle = {
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: 'rgb(0, 188, 212)',
};

const PopupCard = ({ data, id, position }: Props) =>
  position ? (
    <Card
      style={{
        position: 'absolute',
        // width: '20rem',
        // height: '10rem',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
    <div
      className="circular-nav"

    >
      <IconButton
        tooltip="Driving Directions"
        tooltipPosition="top-left"
        style={btnStyle}
        iconStyle={{ color: 'white' }}
        className="btn-driving"
        // onTouchTap={() => { this.props.dispatch({dest: marker.coords, methods: 'driving-traffic' }) }}
      >
        <DirectionsCar />
      </IconButton>
      <IconButton
        tooltip="Public Transit Directions"
        tooltipPosition="top-left"
        style={btnStyle}
        iconStyle={{ color: 'white' }}

        // onTouchTap={() =>
        // { this.props.dispatch({ dest: marker.coords, methods: 'cycling' })}}
      >
        <DirectionsBike />
      </IconButton>
      <IconButton
        tooltip="Walking Directions"
        tooltipPosition="top-left"
        style={btnStyle}
        iconStyle={{ color: 'white' }}

        // onTouchTap={() => { this.props.dispatch({dest: marker.coords, methods: 'walking' }) }}
      >
        <DirectionsWalk />
      </IconButton>
    </div>
        {data && <CardHeader
          style={{ paddingBottom: 0 }}
          title="COMPS INFO"
        />}
        {data && <CardText style={{ fontSize: '0..8rem' }}>
          <ul style={{ lineHeight: '2.1em' }}>
            <li><strong>Address: </strong>
              {data.street}</li>
            <li><strong>Last Sold Price: </strong>
              {data.lastSoldPrice ? `$${data.lastSoldPrice}, ` : `No Data Available`}<em>{data.lastSoldDate}</em></li>
            <li><strong>Zestimate: </strong>
              {data.zestimate ? `$${data.zestimate}` : `No Data Available`}</li>
            <li><strong>Value Range: </strong>
              {(data.valueLow && data.valueHigh) ? `$${data.valueLow} - $${data.valueHigh}` : `No Data Available`}</li>
            <li>
              <strong>Monthly Trend: </strong>
              {data.monthChange >= 0
                ? <TrendingUp style={{ width: '18px', height: '18px' }}>Price Up</TrendingUp>
                : <TrendingDown style={{ width: '18px', height: '18px' }}>Price Down</TrendingDown>}
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <label>Go To</label>
                <IconButton
                  tooltip="Driving Directions"
                  tooltipPosition="bottom-center"
                  // onTouchTap={() => { this.props.dispatch({dest: marker.coords, methods: 'driving-traffic' }) }}
                >
                  <DirectionsCar />
                </IconButton>
                <IconButton
                  tooltip="Public Transit Directions"
                  tooltipPosition="bottom-center"
                  // onTouchTap={() =>
                  // { this.props.dispatch({ dest: marker.coords, methods: 'cycling' })}}
                >
                  <DirectionsBike />
                </IconButton>
                <IconButton
                  tooltip="Cycling Directions"
                  tooltipPosition="bottom-center"
                  // onTouchTap={() => { this.props.dispatch({dest: marker.coords, methods: 'walking' }) }}
                >
                  <DirectionsWalk />
                </IconButton>
              </div>
            </li>
          </ul>
        </CardText>}
    </Card >
) : <div />;

export default PopupCard;
