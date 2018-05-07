import { combineReducers } from 'redux';

import app from './app';
import map from './map';
import slider from './slider';
import popup from './popup';
import marker from './marker';
import message from './message';

export default combineReducers({
  app,
  map,
  slider,
  popup,
  marker,
  message,
});
