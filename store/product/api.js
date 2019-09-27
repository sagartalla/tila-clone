import _ from 'lodash';
import axios from 'axios';
import Cookies from 'universal-cookie';
import generateURL from '../../utils/urlGenerator';
import { pimServiceInstance } from '../helper/services';
import constants from '../helper/constants';

const cookies = new Cookies();

const getProduct = (options) => {
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/`, options);
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
      },
    };
  });
};

const getReviewRatings = (options, orderId, orderItemId) => {
  return axios.post(`${constants.REVIEWS_API_URL}/api/v1/reviews/fetch`,options).then(({ data }) => {
    return {
      data,
      orderId,
      orderItemId,
    };
  });
}
const downloadReviewPics = (imageIds) => {
  return Promise.all(imageIds.map((imageId) => {
    return generateURL(imageId)
  }))
}

const submitUserReview = (options) => {
  return axios.post(`${constants.REVIEWS_API_URL}/api/v1/reviews/write_or_edit`,options)
};

const setSelectedVariant = ({ selectedVariantData, itemType, catalogId, variantId }) => {
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/getVariantStockDetails`, {
    itemType,
    attributeKey: Object.keys(selectedVariantData)[0],
    attributeValue: Object.values(selectedVariantData)[0],
    catalogId,
    countryCode: cookies.get('country'),
  }).then(({ data }) => {
    return {
      selectedVariantId: variantId,
      selectedVariantData,
      availableSimilarProducts:
        data.reduce((acc, val) => ({ ...acc, [val.productId]: [val.inStock] }), {}),
    };
  });
};

const uploadReviewImages = (body, cid) => {
  return axios.request({
    method: 'POST',
    url: `${constants.TRANSFORMER_API_URL}/fpts/document-service/upload/bulk?directory=${cid}`,
    data: body,
    headers: {
      'tenant': 'review-service',
    },
  }).then(({data}) => {
    return data;
  }).catch((data) => {
    console.log(data);
  })
}

const track = (params) => {
  window.appEventData.push({
    event: params.eventName,
    product: [
      {
        productInfo: {
          // "pageName":params.titleInfo.title,
          categoryType: params.ProductData.categoryType,
          productID: params.ProductData.catalogObj.product_id,
          variantId: params.ProductData.catalogObj.variant_id,
          itemType: params.ProductData.catalogObj.item_type,
          breadcrums: params.ProductData.breadcrums ? params.ProductData.breadcrums.map(item => item.display_name_en) : [],
          catalogId: params.ProductData.catalogObj.catalog_id,
          listingId: params.ProductData.titleInfo.listingId,
          brandTitle: params.ProductData.titleInfo.brand,
          ratingCount: params.ProductData.titleInfo.rating.count,
          reviewsCount: params.ProductData.titleInfo.reviews.count,
          productTitle: params.ProductData.titleInfo.title,
          sellingPrice: params.ProductData.offerInfo,
          brand : params.ProductData.titleInfo.brand.attribute_values[0].value,
          isOutOfStock: false,
        },
        price: {
          sellingPrice: '',
          basePrice: '',
        },
      },
    ],
  });
};

const getCities = (code) => {
  return axios.get(`${constants.TRANSFORMER_API_URL}/fpts/geolocation/city_by_code?iso_${code.length}=${code}`);
};

const getCountries = () => axios.get(`${constants.TRANSFORMER_API_URL}/fpts/geolocation/country`);

export default {
  getProduct, getPreview, getReviewRatings, submitUserReview, downloadReviewPics,
  setSelectedVariant, getCities, track, getCountries, uploadReviewImages
};
