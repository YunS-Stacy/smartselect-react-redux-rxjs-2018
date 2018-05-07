import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import { Spin } from 'antd';

interface Props {
  data?: any;
  fetched: boolean | string;
}
const InfoCard = ({ data, fetched }: Props) =>
  (fetched !== false) ? (
    <Card
      style={{
        position: 'absolute',
        right: '2rem',
        top: '.5rem  ',
        width: '20rem',
        height: '14rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin
        wrapperClassName="info-card-spin"
        spinning={fetched === 'loading'}
        // style={{
        //   position: 'absolute',
        //   right: '2rem',
        //   width: '20rem',
        //   top: '.5rem  ',
        // }}
      >
        {data && <CardHeader
          style={{ paddingBottom: 0 }}
          title="COMPS INFO"
        />}
        {data && <CardText style={{ paddingTop: '1em', fontSize: '0.95em' }}>
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
      </Spin>
    </Card >
) : <div />;

export default InfoCard;
