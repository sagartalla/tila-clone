import _ from 'lodash';
import axios from 'axios';

import constants from '../helper/constants';

const getCartDetailsApi = (params) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/view`, (params ? params : {})).then(({ data }) => {
    return { data };
  });
};

const addToCart = (params) => {
  return axios.post(`${constants.CART_API_URL}/api/v1/cart/add`, params);
}

const removeCartItemApi = (params) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/delete`, params).then(({ data }) => {
    return getCartDetailsApi();
  })
}

const cartItemCountApi = (params, typ) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/quantity/${typ}`, params).then(({ data }) => {
    return getCartDetailsApi();
  }).catch(function (error) {
    return getCartDetailsApi();
  });
}

const giftApi = (cartItemId, typ, params = {}) => {
  return axios.post(`${constants.CART_API_URL}/api/v1/cart/${cartItemId}/gift/${typ}`, params).then(({ data }) => {
    return getCartDetailsApi();
  })
}

export default { getCartDetailsApi, addToCart, removeCartItemApi, cartItemCountApi, giftApi };
