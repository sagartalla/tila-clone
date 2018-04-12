import { searchServiceInstance } from '../helper/services';

const getSearchResultsApi = ({categoryId, country, pageSize, query, language, customFilters, pageNum}) => {
  const data = {
    "categoryFilter": {
      "id": categoryId
    },
    country,
    customFilters,
    language,
    pageNum,
    pageSize,
    query,
  };
  return searchServiceInstance.post('/search', data).then(({data}) => {
    data.paginationDetails = {
      pageSize,
      pageNum,
    };
    data.searchDetails = {
      query,
      country,
      language,
      customFilters,
      categoryFilter: {
        "id": categoryId
      },
    };
    return { data };
  })
}
export { getSearchResultsApi };