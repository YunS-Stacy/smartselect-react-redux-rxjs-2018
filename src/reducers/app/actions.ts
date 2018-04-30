import {
  APP_TOGGLE,
  FETCH_DATA,
  FETCH_DATA_FULFILLED,
  FETCH_DATA_CANCELLED,
  FETCH_DATA_REJECTED
} from '../../constants/action-types';

export const toggleApp = () => ({
  type: APP_TOGGLE,
});

export const fetchData = (payload: string) => ({
  payload,
  type: FETCH_DATA,
});

export const fetchDataFulfilled = (payload: { name: string; data: any }) => ({
  payload,
  type: FETCH_DATA_FULFILLED,
});

export const fetchDataCancelled = (payload: string) => ({
  type: FETCH_DATA_CANCELLED,
});

export const fetchDataRejected = (payload: string) => ({
  payload,
  type: FETCH_DATA_REJECTED,
});
