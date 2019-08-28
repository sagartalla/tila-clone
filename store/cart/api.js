import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastContent from '../../components/common/ToastContent'
import constants from '../helper/constants';
import { languageDefinations } from '../../utils/lang/';

const { API_TEXT, CART_PAGE } = languageDefinations();

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
    params.changeRemoveWarranty ? toast(<ToastContent
      msg={`${params.warrantyName !== '' && (params.warrantyName === 'extended_warranty' ? CART_PAGE.EXTENDED_WARRANTY + ' ' + API_TEXT.WARRANTY_REMOVED_FROM_CART_ITEM : CART_PAGE.DAMAGE_PROTECTION + ' ' + API_TEXT.WARRANTY_REMOVED_FROM_CART_ITEM)}`}
      msgType="success"
    />) :  params.changeAddWarranty ? toast(<ToastContent
      msg={`${params.warrantyName !== '' && (params.warrantyName === 'extended_warranty' ? CART_PAGE.EXTENDED_WARRANTY + ' ' + API_TEXT.WARRANTY_ADDED_CART_ITEM : CART_PAGE.DAMAGE_PROTECTION + ' ' + API_TEXT.WARRANTY_ADDED_CART_ITEM)}`}
      msgType="success"
    />) : toast(<ToastContent
      msg={API_TEXT.ITEM_ADDED_TO_CART}
      msgType="success"
    />);
    return res;
  });
}

const removeCartItemApi = (params, toastObj = {}) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/delete`, params).then(({ data }) => {
    if (toastObj.showToast) {
      toast(
        <ToastContent
          msg={API_TEXT.ITEM_DELETED_FROM_CART}
          msgType='success'
        />
      )
    }
    return getCartDetailsApi();
  });
};

const cartItemCountApi = (params, type) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/quantity/${type}`, params).then(({ data }) => {
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
  const cartItem = params.postResult.filter(item => item.cart_item_id === params.cartId)[0];
  const obj = {
    event: params.eventName,
  };
  switch (params.eventName) {
    case 'CART_VIEW':
      obj.cart = {
        item: params.postResult,
      };
      break;
    case 'CART_REMOVE':
      obj.product = [{
        quantity: cartItem.quantity,
        productInfo: {
          productID: cartItem.product_details.product_id,
        },
      }];
      break;
    case 'CART_QTY_CHANGE':
      obj.product = [{
        quantity: params.type === 'add' ? cartItem.quantity + 1 : cartItem.quantity - 1,
        productInfo: {
          productID: cartItem.product_details.product_id,
        },
      }];
      break;
    case 'ADD_TO_CART':
      obj.product = [{
        quantity: params.quantity,
        productInfo: {
          productID: params.product_id,
        },
      }];
      break;
    default:
      obj.cart = {
        item: params.postResult,
      };
  }
  window.appEventData.push(obj);
};

export default {
  getCartDetailsApi, addToCart, removeCartItemApi, cartItemCountApi, giftApi, track,
};
