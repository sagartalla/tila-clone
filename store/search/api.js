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
  categoryTree,
  shippingDetails
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
    shippingDetails,
  };
  if (categoryTree) {
    options.categoryId = categoryFilter.id;
  } else {
    options.categoryFilter = categoryFilter;
  }
  return axios.get(`${constants.SEARCH_API_URL}/search${categoryTree ? '/browseByCatId/': ''}?query=${escape(JSON.stringify(options))}`).then(({ data }) => {
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
      shippingDetails,
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
