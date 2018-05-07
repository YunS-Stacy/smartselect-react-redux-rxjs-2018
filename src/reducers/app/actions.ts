import {
  APP_TOGGLE,
  DATA_FETCH,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_CANCELLED,
  DATA_FETCH_REJECTED,
  DATA_FETCH_LOADING
} from '../../constants/action-types';

export const toggleApp = () => ({
  type: APP_TOGGLE,
});

export const fetchData = (payload: string) => ({
  payload,
  type: DATA_FETCH,
});

export const fetchDataFulfilled = (payload: { name: string; data: any }) => ({
  payload,
  type: DATA_FETCH_FULFILLED,
});

export const fetchDataCancelled = (payload: string) => ({
  type: DATA_FETCH_CANCELLED,
});

export const fetchDataRejected = (payload: string) => ({
  payload,
  type: DATA_FETCH_REJECTED,
});

export const fetchDataLoading = (payload: string) => ({
  payload,
  type: DATA_FETCH_LOADING,
});
