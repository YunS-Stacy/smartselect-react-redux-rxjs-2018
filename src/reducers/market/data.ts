import {
  DATA_FETCH,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_CANCELLED,
  DATA_FETCH_REJECTED
} from '../../constants/action-types';
import { RootState } from '../../types';
import { Action } from 'redux';
import { Frame } from 'g2';
import marker from '../marker';

const initialState: any[] = [];

export default (state = initialState, { type, payload }: Action & { payload?: any }) => {
  switch (type) {
    case DATA_FETCH_FULFILLED:
      const { name, data } = payload;
      if (name === 'market') {
        // localmarket
        const tempMarket = data;
        const frameMarket = new Frame(tempMarket);
        // philly
        const dataPhilly = Frame.filter(frameMarket, (datum: any) => datum['Region Type'] === 'city');

        const tempPhillyMonth = Frame.combineColumns(dataPhilly,
          ['Jan_2010', 'Feb_2010', 'Mar_2010', 'Apr_2010', 'May_2010', 'Jun_2010',
            'Jul_2010', 'Aug_2010', 'Sep_2010', 'Oct_2010', 'Nov_2010', 'Dec_2010',
            'Jan_2011', 'Feb_2011', 'Mar_2011', 'Apr_2011', 'May_2011', 'Jun_2011',
            'Jul_2011', 'Aug_2011', 'Sep_2011', 'Oct_2011', 'Nov_2011', 'Dec_2011',
            'Jan_2012', 'Feb_2012', 'Mar_2012', 'Apr_2012', 'May_2012', 'Jun_2012',
            'Jul_2012', 'Aug_2012', 'Sep_2012', 'Oct_2012', 'Nov_2012', 'Dec_2012',
            'Jan_2013', 'Feb_2013', 'Mar_2013', 'Apr_2013', 'May_2013', 'Jun_2013',
            'Jul_2013', 'Aug_2013', 'Sep_2013', 'Oct_2013', 'Nov_2013', 'Dec_2013',
            'Jan_2014', 'Feb_2014', 'Mar_2014', 'Apr_2014', 'May_2014', 'Jun_2014',
            'Jul_2014', 'Aug_2014', 'Sep_2014', 'Oct_2014', 'Nov_2014', 'Dec_2014',
            'Jan_2015', 'Feb_2015', 'Mar_2015', 'Apr_2015', 'May_2015', 'Jun_2015',
            'Jul_2015', 'Aug_2015', 'Sep_2015', 'Oct_2015', 'Nov_2015', 'Dec_2015',
            'Jan_2016', 'Feb_2016', 'Mar_2016', 'Apr_2016', 'May_2016', 'Jun_2016',
            'Jul_2016', 'Aug_2016', 'Sep_2016', 'Oct_2016', 'Nov_2016', 'Dec_2016',
            'Jan_2017', 'Feb_2017'], 'valueChange', 'monthYear', ['Region_Name']);
        const marketPhilly = tempPhillyMonth.toJSON();
        // neighborhood
        const dataNeigh = Frame.sort(frameMarket, 'Feb_2017');
        const filterNeigh = Frame.filter(dataNeigh, (datum: any) => datum['Region Type'] === 'neighborhood');
        const tempNeigh = Frame.combineColumns(
          filterNeigh,
          ['Feb_2017', 'Jan_2017', 'Dec_2016', 'Nov_2016', 'Oct_2016', 'Sep_2016', 'Aug_2016', 'Jul_2016',
            'Jun_2016', 'May_2016', 'Apr_2016', 'Mar_2016', 'Feb_2016', 'Jan_2016', 'Dec_2015', 'Nov_2015',
            'Oct_2015', 'Sep_2015', 'Aug_2015', 'Jul_2015', 'Jun_2015', 'May_2015', 'Apr_2015', 'Mar_2015',
            'Feb_2015', 'Jan_2015'], 'valueChange', 'monthYear', ['Region_Name']);
        const marketNeigh = tempNeigh.toJSON();
        return { region: marketPhilly, city: marketNeigh };
      }
      return state;
    default:
      return state;
  }
};
