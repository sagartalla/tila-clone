import _ from 'lodash';
import axios from 'axios';

import constants from '../helper/constants';

const getListingCartDetailsApi = (params) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/view`, (params ? {...params, "fetch_instant_checkout_options": true} : {})).then(({ data }) => {
    return { data };
  });
};

const addToCart = (params, listingId) => {
  return axios.post(`${constants.CART_API_URL}/api/v1/cart/add`, params).then(({ data }) => {
    return getListingCartDetailsApi({
      inst_chk_out_listings: [listingId]
    })
  });
}

const removeCartItemApi = (params) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/delete`, params).then(({ data }) => {
    // return getCartDetailsApi();
    return { data };
  })
}

const cartItemCountApi = (params, typ, listingId) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/quantity/${typ}`, params).then(({ data }) => {
    return getListingCartDetailsApi({
      inst_chk_out_listings: [listingId]
    });
  });
}

export default { getListingCartDetailsApi, addToCart, removeCartItemApi, cartItemCountApi };