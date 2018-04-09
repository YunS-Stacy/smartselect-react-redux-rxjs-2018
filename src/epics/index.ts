import { combineEpics } from 'redux-observable';
import app from './app';
import map from './map';

export default combineEpics(
  app,
  map
);
