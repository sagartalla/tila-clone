import { getSearchResultsApi } from './api';
import { get } from 'https';

const actions = {
  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
};

const actionCreaters = {
  getSearchResults: params => (dispatch, getState) => {
    const state = getState();
    const data = Object.assign({}, state.searchReducer.data.searchDetails, state.searchReducer.data.paginationDetails, params);
    return dispatch({
      type: actions.GET_SEARCH_RESULTS,
      payload: getSearchResultsApi(data),
    });
  }
};  

export { actions, actionCreaters };

