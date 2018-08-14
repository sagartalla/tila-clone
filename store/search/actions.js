import apis from './api';

const actions = {
  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
  GET_MORE_RESULTS: 'GET_MORE_RESULTS',
  SEARCHBAR_FITLERS: 'SEARCHBAR_FITLERS',
  AUTO_SUGGESTIONS:'AUTO_SUGGESTIONS',
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
  autoCompleteSuggestion:(data) => (dispatch,getState) => {
    return dispatch({
      type:actions.AUTO_SUGGESTIONS,
      payload:apis.getAutoSuggestions(data)
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
  }
};

export { actions, actionCreators };
