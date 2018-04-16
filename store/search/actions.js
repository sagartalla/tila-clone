import { getSearchResultsApi } from './api';
import { get } from 'https';

const actions = {
  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
  GET_MORE_RESULTS: 'GET_MORE_RESULTS'
};

const actionCreaters = {
  getSearchResults: (params, loadMore) => (dispatch, getState) => {
    const state = getState();
    const data = Object.assign({}, state.searchReducer.data.searchDetails, state.searchReducer.data.paginationDetails, loadMore ? {} : { pageNum: 1 }, params);
    return dispatch({
      type: loadMore ? actions.GET_MORE_RESULTS : actions.GET_SEARCH_RESULTS,
      payload: getSearchResultsApi(data),
    });
  }
};  

export { actions, actionCreaters };

