import { combineEpics } from 'redux-observable';
import map from './map';
import data from './data';

export default combineEpics(
  map,
  data,
);
