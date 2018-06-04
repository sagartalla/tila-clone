import _ from 'lodash';
import axios from 'axios';

import constants from '../helper/constants';

const getCartDetailsApi = () => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/view`, {}).then(({ data }) => {
    return { data };
  });
};

const addToCart = (params) => {
  return axios.post(`${constants.CART_API_URL}/api/v1/cart/add`, params);
}

const removeCartItemApi = (params) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/delete`, params).then(({ data }) => {

    // calling this function because to get cart details again.
    return getCartDetailsApi();
  })
}

const increaseItemCntApi = (params) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/quantity/add`, params).then(({ data }) => {

    // calling this function because to get cart details again.
    return getCartDetailsApi();
  });
}

const decreaseItemCntApi = (params) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/quantity/remove`, params).then(({ data }) => {

    // calling this function because to get cart details again.
    return getCartDetailsApi();
  });
}

export default { getCartDetailsApi, addToCart, removeCartItemApi, increaseItemCntApi, decreaseItemCntApi };