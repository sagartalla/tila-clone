import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getSearchResultsApi = ({
  categoryFilter,
  country,
  pageSize,
  query,
  language,
  facetFilters,
  pageNum,
  fl,
  isListed,
  categoryTree
}) => {
  const options = {
    country,
    facetFilters,
    language,
    pageNum,
    pageSize,
    query,
    fl,
    isListed,
  };
  if (categoryTree) {
    options.categoryId = categoryFilter.id;
  } else {
    options.categoryFilter = categoryFilter;
  }
  return axios.post(`${constants.SEARCH_API_URL}/search${categoryTree ? '/browseByCatId/': ''}`, options).then(({ data }) => {
    if (data.categoryFilter) {
      data.categoryFilter.parentCategories.forEach((parentCategory) => {
        parentCategory.canonicalId = _.kebabCase(parentCategory.name);
        parentCategory.childCategories.forEach((childCategory) => {
          childCategory.canonicalId = _.kebabCase(childCategory.name);
        });
      });
    }
    const { products, noOfProducts } = data.productResponse;
    const hasMore = (((pageNum - 1) * pageSize) + products.length) !== noOfProducts;

    data.paginationDetails = {
      pageSize,
      pageNum,
      hasMore,
    };
    data.searchDetails = {
      query,
      facetFilters,
      categoryFilter,
    };
    data.geoDetails = {
      country,
      language,
    }
    data.hardCodedValues = {
      fl,
      isListed,
    }
    return { data };
  });
};
export default { getSearchResultsApi };
