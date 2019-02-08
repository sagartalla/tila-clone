import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const getSearchResultsApi = ({
  categoryFilter,
  country,
  pageSize,
  query,
  language,
  facetFilters,
  facetFiltersCopyWithNames,
  pageNum,
  fl,
  isListed,
  categoryTree,
  choosenCategoryName,
  shippingDetails,
  sort,
  disableSpellCheck,
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
    disableSpellCheck,
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
      facetFiltersCopyWithNames,
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

const fetchSuggestions = ({key}) => {
  return axios.get(`${constants.SUGGESSIONS_URL}?queryString=${key}&lang=${cookies.get('language')}`)
}

const fetchImageSearchApi = (file) => {
  const body = new FormData();
  body.append('file', file);
  // body.append('X-Access-Token', file);
  // body.append('directory', `${URL.ENV}/${path}`);
  return axios.request({
    url:'https://apigateway-preprod.tila.com/image-search/imagesearch',
    method:'POST',
    data:body
  })
}
// return axios.request({
//   url: `${URL.UPLOAD_SERVICE_URL}/fpts/document-service/upload?public=${isPublic}&directory=${directory}`,
//   method: 'POST',
//   onUploadProgress: (progressEvent) => {
//   if (progressEvent.lengthComputable) {
//   const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//   dispatch(uploadProgressData(percent));
//   }
//   },
//   data: body,
//   })
export default { getSearchResultsApi, fetchSuggestions,fetchImageSearchApi };
