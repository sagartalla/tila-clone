import { getSearchResultsApi } from './api';

const actions = {
  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
};

const actionCreaters = {
  getSearchResults: params => (dispatch, getState) => {
    return dispatch({
      type: actions.GET_SEARCH_RESULTS,
      payload: getSearchResultsApi(params),
    });
  }
};  

export { actions, actionCreaters };

