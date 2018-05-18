
import {
  ROUTE_FETCH,
} from '../../constants/action-types';
/**
 *
 * @param profile Routing profiles for Mapbox Directions API: 'driving-traffic', 'driving', 'walking', 'cycling'
 * @param dest Destination coordinates
 */
export const fetchRoute = (payload: { profile: string; dest: mapboxgl.LngLat }) => ({
  payload,
  type: ROUTE_FETCH,
});
