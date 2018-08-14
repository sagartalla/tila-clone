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
  choosenCategoryName,
  shippingDetails,
  sort
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
    sort,
  };
  if (categoryTree) {
    options.categoryId = categoryFilter.id;
  } else {
    options.categoryFilter = categoryFilter;
  }
  return axios.get(`${constants.SEARCH_API_URL}/search${categoryTree ? '/browseByCatId/': ''}?query=${escape(JSON.stringify(options))}`).then(({ data }) => {
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
      sort,
      categoryTree,
      choosenCategoryName,
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
