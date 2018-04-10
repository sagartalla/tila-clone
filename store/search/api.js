import { searchServiceInstance } from '../helper/services';

const getSearchResultsApi = () =>
  searchServiceInstance.post('/search', {
    "categoryFilter": {
      "id": 2
    },
    "country": "UAE",
    "customFilters": {},
    "language": "en",
    "pageNum": 1,
    "pageSize": 100,
    "query": "mobile"
  })

export { getSearchResultsApi };