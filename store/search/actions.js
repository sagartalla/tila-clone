import apis from './api';

const actions = {
  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
  GET_MORE_RESULTS: 'GET_MORE_RESULTS',
  SEARCHBAR_FITLERS: 'SEARCHBAR_FITLERS',
  REMOVE_FILTERS: 'REMOVE_FILTERS',
  FETCH_SUGGESTIONS: 'FETCH_SUGGESTIONS',
  FETCH_IMAGESEARCHDATA: 'FETCH_IMAGESEARCHDATA',
};

const actionCreators = {
  getSearchResults: (params, loadMore, flushFilters) => (dispatch, getState) => {
    const state = getState();
    const { searchReducer } = state;
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
  },
  fetchSuggestions:(params) => {
    return ({
      type: actions.FETCH_SUGGESTIONS,
      payload: apis.fetchSuggestions(params)
    })
  },
  fetchImageSearchData:(params) => {
    return ({
      type:actions.GET_SEARCH_RESULTS,
      payload:apis.fetchImageSearchApi(params)
    })
  }
};

export { actions, actionCreators };
