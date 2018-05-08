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
      <div
        className="circular-nav"
      >
        <IconButton
          tooltip="Get Comparables"
          tooltipPosition="top-left"
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: 'rgb(0, 188, 212)',
          }}
          iconStyle={{ color: 'white' }}
          className="btn-comps"
          onClick={() => handleFetchPopup(marker.zpid)}
        >
          <Business />
        </IconButton>
      </div>
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
          </ul>
        </CardText>}
      </Spin>
    </Card >
  ) : <div />;

export default MarkerCard;
