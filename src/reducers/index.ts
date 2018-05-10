import { combineReducers } from 'redux';

import app from './app';
import correlation from './correlation';

import map from './map';
import slider from './slider';
import popup from './popup';
import marker from './marker';
import message from './message';
import route from './route';

export default combineReducers({
  app,
  map,
  slider,
  correlation,
  popup,
  marker,
  message,
  route,
});
