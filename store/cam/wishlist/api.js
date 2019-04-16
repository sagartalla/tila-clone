import axios from 'axios';
import { toast } from 'react-toastify';
import constants from '../../helper/constants';
import { languageDefinations } from '../../../utils/lang/';

const { API_TEXT } = languageDefinations();

const getWishlistApi = (currentPage=0) => {
  return axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/getWishlist?size=10&page=${currentPage}`).then(({ data }) => {
    return { data };
  });
};

const addToWishlistApi = (params) => {
  return axios.put(`${constants.WISHLIST_API_URL}/api/v1/wishlist/create`, params).then(({ data }) => {
    toast.success(API_TEXT.ITEM_ADDED_TO_WISHLIST);
    return { data };
  });
}

const deleteWishlistApi = (wishlist_id, toastObj = {},currentPage) => {
  return axios.post(`${constants.WISHLIST_API_URL}/api/v1/wishlist/delete?wishlist_id=${wishlist_id}`, {}).then(({ data }) => {
    // return { data };
    if (toastObj.showToast) {
      toast.success(API_TEXT.ITEM_REMOVED_FROM_WISHLIST);
    }
    return getWishlistApi(currentPage);
  });
}

const notifyMe = params => axios.post(`${constants.WISHLIST_API_URL}/api/v1/alert/stock/srp`, params)
  .then((res) => {
    toast.success(API_TEXT.WILL_BE_NOTIFIED_SOON);
    return res;
  });
  const track = (params) => {
    if (params.hasOwnProperty("wishlistId")) {
      for (var i = 0; i < params.postResult.length; i++) {
        if (params.postResult[i].wishlist_id === params.wishlistId) {
          window.appEventData.push({
            "event": params.eventName,
            "product": [
              {
                "productInfo": {
                  "productID": params.postResult[i].product_details.product_id,
                }
              }
            ]
          });
        }
      }
    } else if (params.hasOwnProperty("params")) {
        window.appEventData.push({
        "event": params.eventName,
        "product": [
          {
            "productInfo": {
              "productID": params.params.product_id,
            }
          }
        ]
      });
  }else {
      window.appEventData.push({
        "event": params.eventName,
        "cart": {
          "item": params.postResult,
        }
      });
    }
  }
export default {
  getWishlistApi, addToWishlistApi, deleteWishlistApi, notifyMe,track
};
