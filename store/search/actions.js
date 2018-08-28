import apis from './api';

const actions = {
  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
  GET_MORE_RESULTS: 'GET_MORE_RESULTS',
  SEARCHBAR_FITLERS: 'SEARCHBAR_FITLERS',
  REMOVE_FILTERS: 'REMOVE_FILTERS',
};

const actionCreators = {
  getSearchResults: (params, loadMore, flushFilters) => (dispatch, getState) => {
    const state = getState();
    const { searchReducer } = state
    const data = Object.assign({}, flushFilters ? {} : searchReducer.data.searchDetails, searchReducer.data.paginationDetails, searchReducer.data.geoDetails, searchReducer.data.hardCodedValues, loadMore ? {} : { pageNum: 1 }, params);
    return dispatch({
      type: loadMore ? actions.GET_MORE_RESULTS : actions.GET_SEARCH_RESULTS,
      payload: apis.getSearchResultsApi(data),
    });
  },
  hideSearchBarFitlers: () => {
    return ({
      type: actions.SEARCHBAR_FITLERS,
      payload: {
        show: false
      }
    })
  },
  showSearchBarFilters: () => {
    return ({
      type: actions.SEARCHBAR_FITLERS,
      payload: {
        show: true
      }
    })
  },
  removeFilter: (params) => (dispatch, getState) => {
    dispatch({
      type: actions.REMOVE_FILTERS,
      payload: params
    });
    dispatch(actionCreators.getSearchResults({}));
  }
};

export { actions, actionCreators };
