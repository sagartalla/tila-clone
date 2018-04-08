import { searchServiceInstance } from '../helper/services';

const getSearchResultsApi = () =>
  searchServiceInstance.post('/search', {
    categoryFilter: {
      id: 2,
    },
    country: 'UAE',
    language: 'EN',
    pageNum: 0,
    pageSize: 0,
  })

export { getSearchResultsApi };