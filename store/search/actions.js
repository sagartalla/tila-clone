import apis from './api';

const actions = {
  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
  GET_MORE_RESULTS: 'GET_MORE_RESULTS',
};

const actionCreaters = {
  getSearchResults: (params, loadMore, flushFilters) => (dispatch, getState) => {
    const state = getState();
    const { searchReducer } = state
    const data = Object.assign({}, flushFilters ? {} : searchReducer.data.searchDetails, searchReducer.data.paginationDetails, searchReducer.data.geoDetails, searchReducer.data.hardCodedValues, loadMore ? {} : { pageNum: 1 }, params);
    return dispatch({
      type: loadMore ? actions.GET_MORE_RESULTS : actions.GET_SEARCH_RESULTS,
      payload: apis.getSearchResultsApi(data),
    });
  },
};

export { actions, actionCreaters };

