import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';

import constants from '../helper/constants';
import { languageDefinations } from '../../utils/lang/';

const { API_TEXT } = languageDefinations();

const getCartDetailsApi = (params = {}) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/view`, params).then(({ data }) => {
    if (data) {
      data.applyCouponRequestCount = params.applyCouponRequestCount;
    }
    return { data };
  });
};

const addToCart = (params) => {
  return axios.post(`${constants.CART_API_URL}/api/v1/cart/add`, params).then((res) => {
    toast.success(API_TEXT.ITEM_ADDED_TO_CART);
    return res;
  });
}

const removeCartItemApi = (params, toastObj = {}) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/delete`, params).then(({ data }) => {
    if (toastObj.showToast) {
      toast.success(API_TEXT.ITEM_DELETED_FROM_CART);
    }
    return getCartDetailsApi();
  });
};

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
