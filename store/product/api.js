import _ from 'lodash';
import {pimServiceInstance} from '../helper/services';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

import constants from '../helper/constants';

const getProduct = (options) => {
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/`,options);
};

const getPreview = (options) => {
  return Promise.all([
    pimServiceInstance.get(`/catalog/preview/${options.taskCode}`, { accessToken: options.accessToken }),
    axios.get(`${constants.CATALOG_API_URL}/item_type_attribute/${options.itemType}/attributes?request_id=1234567890123456&display_name=true&closed_list_values=true`),
  ]).then(([pimData, catalogData]) => {
    return {
      data: {
        pimData: pimData.data.data,
        catalogData: catalogData.data,
      }
    };
  });
}

const getReviewRatings = (options) => {
  return axios.post(`${constants.REVIEWS_API_URL}/api/v1/reviews/fetch`,options)
}

const submitUserReview = (options) => {
  return axios.post(`${constants.REVIEWS_API_URL}/api/v1/reviews/write_or_edit`,options)
}

const setSelectedVariant = ({selectedVariantData, itemType, catalogId, variantId}) => {
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/getVariantStockDetails`, {
    "itemType": itemType,
    "attributeKey": Object.keys(selectedVariantData)[0],
    "attributeValue": Object.values(selectedVariantData)[0],
    "catalogId": catalogId,
    "countryCode": cookies.get('country')
  }).then(({data}) => {
    return {
      selectedVariantId: variantId,
      selectedVariantData,
      availableSimilarProducts: data.reduce((acc, val) => ({ ...acc, [val.productId]: [val.inStock] }), {})
    }
  });
}
export default { getProduct, getPreview, getReviewRatings,submitUserReview, setSelectedVariant };
