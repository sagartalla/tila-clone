import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import constants from '../../helper/constants';
import { languageDefinations } from '../../../utils/lang/';
import ToastContent from '../../../components/common/ToastContent'

const { API_TEXT } = languageDefinations();

const getWishlistApi = (currentPage = 0, size = 10) => {
  return axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/getWishlist?size=${size}&page=${currentPage}`).then(({ data }) => {
    return { data, currentPage };
  })
};

const getWishlistProducts = () => axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/productIds`);

const track = (params) => {
  if (params.wishlistId) {
    const wishlist = params.postResult.filter(w => w.wishlist_id === params.wishlistId)[0];
    window.appEventData.push({
      event: params.eventName,
      product: [
        {
          productInfo: {
            productID: wishlist.product_id,
          },
        },
      ],
    });
  } else if (params.type === 'NOTIFY' || params.type === 'WL_ADD') {
    window.appEventData.push({
      event: params.eventName,
      product: [
        {
          productInfo: {
            productID: params.params.product_id,
          },
        },
      ],
    });
  } else {
    window.appEventData.push({
      event: params.eventName,
      cart: {
        item: params.postResult,
      },
    });
  }
};

const addToWishlistApi = params => axios.put(`${constants.WISHLIST_API_URL}/api/v1/wishlist/create`, params).then(({ data }) => {
  toast(<ToastContent
    msg={API_TEXT.ITEM_ADDED_TO_WISHLIST}
    msgType="success"
  />);
  //toast.success(API_TEXT.ITEM_ADDED_TO_WISHLIST);
  return { data };
});

const deleteWishlistApi = (wishlist_id, toastObj = {}, currentPage) => axios.post(`${constants.WISHLIST_API_URL}/api/v1/wishlist/delete?wishlist_id=${wishlist_id}`, {}).then(({ data }) => {
  // return { data };
  if (toastObj.showToast) {
    toast(<ToastContent
      msg={API_TEXT.ITEM_REMOVED_FROM_WISHLIST}
      msgType="success"
    />);
  }
  // getWishlistProducts();
  return getWishlistApi(currentPage);
});

const notifyMe = params => axios.post(`${constants.WISHLIST_API_URL}/api/v1/alert/stock/srp`, params).then((res) => {
  toast(<ToastContent
    msg={API_TEXT.WILL_BE_NOTIFIED_SOON}
    msgType="success"
  />);
  return res;
});

const wishlistNotify = wishlistId => axios.post(`${constants.WISHLIST_API_URL}/api/v1/wishlist/alert/stock/${wishlistId}`).then((res) => {
  toast(<ToastContent
    msg={API_TEXT.WILL_BE_NOTIFIED_SOON}
    msgType="success"
  />);
  return res;
});

const getRecentlyViewed = () => axios.get(`${constants.WISHLIST_API_URL}/api/v1/recently/viewed/item/get`);

const addProductToRV = variantId => axios.post(`${constants.WISHLIST_API_URL}/api/v1/recently/viewed/item/add`, {
  source: 'WEB',
  variant_ids: [
    variantId,
  ],
});

export default {
  getWishlistApi, addToWishlistApi, deleteWishlistApi, notifyMe,
  track, getWishlistProducts, wishlistNotify, getRecentlyViewed, addProductToRV,
};
