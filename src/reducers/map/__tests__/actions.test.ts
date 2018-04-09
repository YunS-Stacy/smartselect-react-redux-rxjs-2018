import { setMap, initMap, setInstance } from '../actions';
import { MAP_SET, MAP_INIT, INSTANCE_SET } from '../../../constants/action-types';
import { Map } from 'mapbox-gl';

const element = document.createElement('div');
const instance = new Map();
describe('actions', () => {
  it('should create an action to toggle the mode', () => {
    const expectedAction = {
      type: MAP_SET,
      payload: 'welcome',
    };
    expect(setMap('welcome')).toEqual(expectedAction);
  });

  it('should create an action to init map', () => {
    const expectedAction = {
      type: MAP_INIT,
      payload: element,
    };
    expect(initMap(element)).toEqual(expectedAction);
  });

  it('should create an action to set map instance', () => {
    const expectedAction = {
      type: INSTANCE_SET,
      payload: instance,
    };
    expect(setInstance(instance)).toEqual(expectedAction);
  });
});
