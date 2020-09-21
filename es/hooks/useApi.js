import { useReducer } from 'react';
import dataFetchReducer from '../reducers/dataFetchReducer';

var useApi = function useApi() {
  var _useReducer = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: [],
    lastPage: false
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var fetchImages = function fetchImages(url, isMore) {
    if (isMore) {
      dispatch({ type: 'FETCH_MORE_INIT' });
    } else {
      dispatch({ type: 'FETCH_INIT' });
    }

    fetch(url).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (isMore) {
        dispatch({
          type: 'FETCH_MORE_SUCCESS',
          payload: response.data,
          pagination: response.pagination
        });
      } else {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data,
          pagination: response.pagination
        });
      }
    }).catch(function () {
      dispatch({ type: 'FETCH_FAILURE' });
    });
  };

  return [state, fetchImages];
};

export default useApi;