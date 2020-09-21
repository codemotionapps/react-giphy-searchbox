var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var dataFetchReducer = function dataFetchReducer(state, action) {
  var payload = action.payload,
      pagination = action.pagination;


  switch (action.type) {
    case 'FETCH_INIT':
      return _extends({}, state, {
        loading: true,
        error: false,
        lastPage: false,
        data: []
      });
    case 'FETCH_MORE_INIT':
      return _extends({}, state, {
        loading: true,
        error: false,
        lastPage: false
      });
    case 'FETCH_SUCCESS':
      return _extends({}, state, {
        loading: false,
        error: false,
        data: payload,
        lastPage: pagination.total_count - pagination.offset <= pagination.count
      });
    case 'FETCH_MORE_SUCCESS':
      return _extends({}, state, {
        loading: false,
        error: false,
        data: [].concat(state.data, payload),
        lastPage: pagination.total_count - pagination.offset <= pagination.count
      });
    case 'FETCH_FAILURE':
      return _extends({}, state, {
        loading: false,
        error: true,
        lastPage: false
      });
    default:
      throw new Error('Unknown action type');
  }
};

export default dataFetchReducer;