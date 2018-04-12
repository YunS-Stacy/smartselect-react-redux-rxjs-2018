import { combineEpics } from 'redux-observable';
import map from './map';

export default combineEpics(
  map,
);
