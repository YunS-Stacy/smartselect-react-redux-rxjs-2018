import { combineReducers } from 'redux';

import bearing from './bearing';
import center from './center';
import loaded from './loaded';
import zoom from './zoom';
import mode from './mode';
import instance from './instance';
import step from './step';
import geometry from './geometry';
import layers from './layers';

export default combineReducers({
  bearing,
  center,
  loaded,
  zoom,
  mode,
  instance,
  step,
  geometry,
  layers,
});
