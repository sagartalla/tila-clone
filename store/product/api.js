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
const track = (params) => {
  window.appEventData.push({
    "event": "Product Viewed",
    "product": [
      {
        "productInfo": {
          // "pageName":params.titleInfo.title,
          "categoryType":params.ProductData.categoryType,
          "productID": params.ProductData.catalogObj.product_id,
          "variantId" :params.ProductData.catalogObj.variant_id,
          "itemType" :params.ProductData.catalogObj.item_type,
          "breadcrums":params.ProductData.breadcrums.map(item => item.display_name_en),
          "catalogId" :params.ProductData.catalogObj.catalog_id,
          "itemType" :params.ProductData.catalogObj.item_type,
          "listingId" :params.ProductData.titleInfo.listingId,
          "brandTitle" :params.ProductData.titleInfo.brand,
          "ratingCount" :params.ProductData.titleInfo.rating.count,
          "reviewsCount" :params.ProductData.titleInfo.reviews.count,
          "productTitle" :params.ProductData.titleInfo.title,
          "productPrice" :params.ProductData.titleInfo.price,
          "isOutOfStock": false
        },
        "price": {
          "sellingPrice": "",
          "basePrice": ""
        }
      }
    ]
  });
}
export default { getProduct, getPreview, getReviewRatings,submitUserReview, setSelectedVariant ,track };
