import { combineReducers } from 'redux';

import data from './data';
import fetched from './fetched';
import id from './id';
import position from './position';

export default combineReducers({
  data,
  fetched,
  id,
  position,
});
