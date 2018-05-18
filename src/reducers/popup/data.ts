import {
  DATA_FETCH_FULFILLED,
  STEP_ADD,
  STEP_MINUS,
} from '../../constants/action-types';
import { Action } from 'redux';

const initialState: any[] = null;

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    // set other marker
    // case MARKER_SET:
    // case POPUP_FETCH:
    // if map step change, reset state

    case STEP_ADD:
    case STEP_MINUS:
      return initialState;

    case DATA_FETCH_FULFILLED: {
      const { name, data } = payload;
      // if it is popup data
      if (name === 'popup') {
        const res = Array.from((data as XMLDocument).getElementsByTagName('comp'));
        // get a list of zpid
        const newState: any[] = res.map((el: HTMLElement) => {
          // must have a zpid
          const zpid = el.getElementsByTagName('zpid')[0].innerHTML;
          // may have address
          const address = el.getElementsByTagName('address');
          let lng, lat, street;
          if (address) {
            lng = address && Number(address[0].getElementsByTagName('longitude')[0].innerHTML);
            lat = address && Number(address[0].getElementsByTagName('latitude')[0].innerHTML);
            street = address && address[0].getElementsByTagName('street')[0].innerHTML;
          }
          // may have last sold date and price
          const lastSoldDate = el.getElementsByTagName('lastSoldDate')
            && el.getElementsByTagName('lastSoldDate')[0].innerHTML;
          const lastSoldPrice = el.getElementsByTagName('lastSoldPrice')
            && el.getElementsByTagName('lastSoldPrice')[0].innerHTML;
          // may have zestimate profile
          const zestimateEl = el.getElementsByTagName('zestimate');
          let zestimate, monthlyChange, valuationRange;
          if (zestimateEl) {
            zestimate = zestimateEl && zestimateEl[0].getElementsByTagName('amount')[0].innerHTML;
            monthlyChange = zestimateEl && zestimateEl[0].getElementsByTagName('valueChange')[0].innerHTML;
            valuationRange = {
              low: zestimateEl && zestimateEl[0].getElementsByTagName('valuationRange')[0]
                .getElementsByTagName('low')[0].innerHTML,
              high: zestimateEl && zestimateEl[0].getElementsByTagName('valuationRange')[0]
                .getElementsByTagName('high')[0].innerHTML,
            };
          }
          return {
            zpid,
            street,
            lastSoldDate,
            lastSoldPrice,
            valuationRange,
            zestimate, monthlyChange,
            coords: { lng, lat },
          };
        });
        return newState;
      }
      // else return state;
      return state;
    }
    default:
      return state;
  }
};
