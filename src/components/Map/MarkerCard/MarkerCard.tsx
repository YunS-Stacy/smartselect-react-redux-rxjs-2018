import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import Business from 'material-ui/svg-icons/communication/business';

import DirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import DirectionsBike from 'material-ui/svg-icons/maps/directions-bike';
import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import IconButton from 'material-ui/IconButton';

import { RootState } from '../../../types';

interface Props {
  marker: RootState['marker'];
}
const MarkerCard = ({ marker }: Props) =>
  marker ? (
    <Card
      style={{
        position: 'absolute',
        // width: '20rem',
        // height: '10rem',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(${marker.position.x}px, ${marker.position.y}px)`,
      }}
    >
        {marker && <CardHeader title="PARCEL INFO" />}
        {marker && <CardText>
          <ul>
            <li><strong>Address: </strong>{marker.address}</li>
            <li><strong>Ref. Price: </strong>${marker.refprice}</li>
            <li style={{ float: 'right', color: 'rgba(0, 0, 0, .4)', fontSize: '.9rem' }}>
              <em>
                <strong>Source: </strong>
                {marker.source}
              </em>
            </li>
            <br />
            <li style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <IconButton
                  tooltip="Get Comps (Zillow)"
                  tooltipPosition="bottom-center"
                  // onTouchTap={() => { this.props.dispatch({ type: 'smartselect/queryZillow', zpid: marker.zpid }) }}
                >
                  <Business />
                </IconButton>
              </div>

              <div style={{ marginLeft: '1em' }}>
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

export default MarkerCard;
