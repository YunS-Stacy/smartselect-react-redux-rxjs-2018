import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import Business from 'material-ui/svg-icons/communication/business';

import DirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import DirectionsBike from 'material-ui/svg-icons/maps/directions-bike';
import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import IconButton from 'material-ui/IconButton';

import { Spin } from 'antd';

import { RootState } from '../../../types';

interface Props {
  marker: RootState['marker'];
  fetched: RootState['popup']['fetched'];
  isPopup: boolean;
  handleFetchPopup: (payload: string) => void;
}
const MarkerCard = ({ marker, fetched, isPopup, handleFetchPopup }: Props) =>
  marker && !isPopup ? (
    <Card
      style={{
        position: 'absolute',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(${marker.position.x}px, ${marker.position.y}px)`,
      }}
    >

      {/* <IconButton
        tooltip="Get Comps (Zillow)"
        tooltipPosition="bottom-center"
        onClick={() => handleFetchPopup(marker.zpid)}
        style={{
          // width: '.5rem',
          transform: `translate(-50px, -50px)`,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow:'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        }}
      >
        <Business />
      </IconButton> */}
      <Spin
        wrapperClassName="Popup-card-spin"
        spinning={fetched === 'loading'}
      >
        {marker && <CardHeader title="PARCEL INFO" />}
        {marker && <CardText style={{ fontSize: '.8rem' }}>
          <ul>
            <li><strong>Address: </strong>{marker.address}</li>
            <li><strong>Ref. Price: </strong>${marker.refprice}</li>
            <li style={{ float: 'right', color: 'rgba(0, 0, 0, .4)' }}>
              <em>
                <strong>Source: </strong>
                {marker.source}
              </em>
            </li>
            <br />
            <li style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <label>Find Comps</label>
                <IconButton
                  tooltip="Get Comps (Zillow)"
                  tooltipPosition="bottom-center"
                  onClick={() => handleFetchPopup(marker.zpid)}
                >
                  <Business />
                </IconButton>
              </div>

              <div style={{ marginLeft: '1em' }}>
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
      </Spin>
    </Card >
  ) : <div />;

export default MarkerCard;
