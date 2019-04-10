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

const track = (params) => {
  if (params.hasOwnProperty("type") || params.eventName === "Cart Removals") {
    for (var i = 0; i < params.postResult.length; i++) {
      if (params.type === "add") {
        if (params.postResult[i].cart_item_id === params.cartId) {
          params.postResult[i].quantity = params.postResult[i].quantity + 1;
          window.appEventData.push({
            "event": params.eventName,
            "product": [
              {
                "quantity": params.postResult[i].quantity,
                "productInfo": {
                  "productID": params.postResult[i].product_details.product_id
                }
              }
            ]
          });
        }
      } else if (params.eventName === "Cart Removals") {
        if (params.postResult[i].cart_item_id === params.cartId) {
          window.appEventData.push({
            "event": params.eventName,
            "product": [
              {
                "quantity": params.postResult[i].quantity,
                "productInfo": {
                  "productID": params.postResult[i].product_details.product_id
                }
              }
            ]
          });
        }
      } else {
        if (params.postResult[i].cart_item_id === params.cartId) {
          params.postResult[i].quantity = params.postResult[i].quantity - 1;
          window.appEventData.push({
            "event": params.eventName,
            "product": [
              {
                "quantity": params.postResult[i].quantity,
                "productInfo": {
                  "productID": params.postResult[i].product_details.product_id
                }
              }
            ]
          });
        }
      }
    }
  }
   else if (params.eventName !== "Cart Removals" && params.eventName!== "Product Added") {
    window.appEventData.push({
      "event": params.eventName,
      "cart": {
        "item": params.postResult,
      }
    });
  }
  else{
    window.appEventData.push({
      "event": params.eventName,
      "product": [
        {
          "quantity": params.quantity,
          "productInfo": {
            "productID": params.product_id
          }
        }
      ]
    });
  }
}
export default { getCartDetailsApi, addToCart, removeCartItemApi, cartItemCountApi, giftApi,track };
