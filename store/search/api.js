import _ from 'lodash';
import { searchServiceInstance } from '../helper/services';


const getSearchResultsApi = ({ categoryFilter, country, pageSize, query, language, facetFilters, pageNum }) => {
  const data = {
    categoryFilter,
    country,
    facetFilters,
    language,
    pageNum,
    pageSize,
    query,
  };
  return searchServiceInstance.post('/search', data).then(({data}) => {
    if(data.categoryFilter){
      data.categoryFilter.parentCategories.forEach((parentCategory) => {
        parentCategory.canonicalId = _.kebabCase(parentCategory.name);
        parentCategory.childCategories.forEach((childCategory) => {
          childCategory.canonicalId = _.kebabCase(childCategory.name)
        });
      });
    }
    const { products, noOfProducts } = data.productResponse;
    const hasMore = ((pageNum - 1) * pageSize + products.length) !== noOfProducts;

    data.paginationDetails = {
      pageSize,
      pageNum,
      hasMore,
    };
    data.searchDetails = {
      query,
      country,
      language,
      facetFilters,
      categoryFilter,
    };
    return { data };
  })
}
export { getSearchResultsApi };