import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';

import DirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import DirectionsBike from 'material-ui/svg-icons/maps/directions-bike';
import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import IconButton from 'material-ui/IconButton';

interface Props {
  data?: any;
  id?: string;
  position?: mapboxgl.Point;

  handleFetchRoute: (payload: { profile: string; dest: mapboxgl.LngLat }) => void;
}

const btnStyle = {
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: 'rgb(0, 188, 212)',
};

const PopupCard = ({ data, id, position, handleFetchRoute }: Props) =>
  position ? (
    <Card
      style={{
        position: 'absolute',
        minWidth: '16rem',
        display: 'flex',
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
          onClick={() => handleFetchRoute({ profile: 'driving', dest: data.coords })}
        >
          <DirectionsCar />
        </IconButton>
        <IconButton
          tooltip="Public Transit Directions"
          tooltipPosition="top-left"
          style={btnStyle}
          iconStyle={{ color: 'white' }}
          onClick={() => handleFetchRoute({ profile: 'cycling', dest: data.coords })}
        >
          <DirectionsBike />
        </IconButton>
        <IconButton
          tooltip="Walking Directions"
          tooltipPosition="top-left"
          style={btnStyle}
          iconStyle={{ color: 'white' }}
          onClick={() => handleFetchRoute({ profile: 'walking', dest: data.coords })}
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
        </ul>
      </CardText>}
    </Card >
  ) : <div />;

export default PopupCard;
