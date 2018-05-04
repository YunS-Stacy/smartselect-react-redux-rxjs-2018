import { combineReducers } from 'redux';

import app from './app';
import map from './map';
import slider from './slider';
import popup from './popup';
import marker from './marker';

export default combineReducers({
  app,
  map,
  slider,
  popup,
  marker,
});
