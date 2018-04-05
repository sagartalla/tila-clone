export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';

export const getSearchResults = params => ({
  type: GET_SEARCH_RESULTS,
  payload: getSearchResultsApi(params),
});