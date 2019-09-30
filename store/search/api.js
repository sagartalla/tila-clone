import _ from 'lodash';
import axios from 'axios';
import Cookies from 'universal-cookie';
import constants from '../helper/constants';

const cookies = new Cookies();

const getSearchResultsApi = ({
  categoryFacet,
  categoryFilter,
  country,
  pageSize,
  query,
  choosenCategoryName,
  language,
  facetFilters,
  facetFiltersCopyWithNames,
  pageNum,
  isListed,
  categoryTree,
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
    query: query || choosenCategoryName.split('-').join(' '),
    fl: '*',
    isListed,
    shippingDetails,
    sort,
    disableSpellCheck,
    requestContext: 'CUSTOMER_BROWSE',
  };
  if (categoryTree && !categoryFacet) {
    options.categoryId = categoryFilter.id;
  } else {
    options.categoryFilter = categoryFilter;
  }
  return axios.get(`${constants.SEARCH_API_URL}/search${categoryTree && !categoryFacet ? '/browseByCatId/' : ''}?query=${encodeURIComponent(JSON.stringify(options))}`).then(({ data }) => {
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
      categoryTree,
      facetFiltersCopyWithNames,
      categoryFilter,
      shippingDetails,
      sort,
      choosenCategoryName,
    };
    data.geoDetails = {
      country,
      language,
    };
    data.hardCodedValues = {
      fl: '*',
      isListed,
    };
    return { data };
  });
};

const fetchSuggestions = ({ key }) => axios.get(`${constants.SUGGESSIONS_URL}?queryString=${key}&lang=${cookies.get('language')}`);

const fetchImageSearchApi = (file) => {
  const body = new FormData();
  body.append('file', file);
  // body.append('X-Access-Token', file);
  // body.append('directory', `${URL.ENV}/${path}`);
  return axios.request({
    url: `${constants.IMAGE_SEARCH_URL}/imagesearch`,
    method: 'POST',
    data: body,
  });
};
const track = ({
	event,
	searchData
}) => {
	switch (event) {
		case "INTERNAL_SEARCH_COUNT":
			window.appEventData.push({
				event,
				internalSearch: {
					count: searchData.results.totalCount.toString(),
					key: searchData.search,
				},
			});
			break;
		case "SEARCH_SORT_BY":
			window.appEventData.push({
				event,
				internalSearch: {
					sortby: searchData,
				},
			});
			break;
    default: break;
	}
};
export default {
  getSearchResultsApi, fetchSuggestions, fetchImageSearchApi, track,
};

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
