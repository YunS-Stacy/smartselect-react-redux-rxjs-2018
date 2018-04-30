import { combineReducers } from 'redux';

import app from './app';
import map from './map';
import slider from './slider';

export default combineReducers({
  app,
  map,
  slider,
});
