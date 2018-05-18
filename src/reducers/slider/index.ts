import { combineReducers } from 'redux';

import data from './data';
import fetched from './fetched';
import range from './range';

export default combineReducers({
  data,
  fetched,
  range,
});
