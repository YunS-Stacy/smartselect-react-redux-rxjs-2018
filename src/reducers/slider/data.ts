import { View } from '@antv/data-set';
import { Action } from 'redux';

import {
  FETCH_DATA_FULFILLED,
  FETCH_DATA_CANCELLED,
  FETCH_DATA_REJECTED,
  SLIDER_RANGE_SET
} from '../../constants/action-types';
import { RootState } from '../../types';
import { ERANGE } from 'constants';

const initialState: any[] = null;

const transfromData = (data: any[]) =>
  new View().source(data).transform({
    type: 'rename',
    map: {
      refprice: 'price', // dv.xxx will be renamed as row.yyy
    },
  }).transform({
    type: 'bin.histogram',
    field: 'price',
    binWidth: 100000,
    groupBy: ['price'],
    as: ['range', 'count'],
  });

export default (state = initialState, { type, payload }: Action & { payload?: any}) => {
  switch (type) {
    case SLIDER_RANGE_SET:
      return state;
    case FETCH_DATA_FULFILLED:
      const { name, data } = payload;
      if (name === 'slider') {
        const newData = new View().source(data)
          .transform({
            type: 'rename',
            map: {
              refprice: 'price', // dv.xxx will be renamed as row.yyy
            },
          }).transform({
            type: 'bin.histogram',
            field: 'price',
            binWidth: 100000,
            groupBy: ['price'],
            as: ['range', 'count'],
          });
        return newData;
      }
      return state;
    default:
      return state;
  }
};