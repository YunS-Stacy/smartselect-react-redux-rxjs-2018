import { combineReducers } from 'redux';

import data from './data';
import fetched from './fetched';

export default combineReducers({
  data,
  fetched,
});
