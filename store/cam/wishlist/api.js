import axios from 'axios';
import { toast } from 'react-toastify';
import constants from '../../helper/constants';

const getWishlistApi = () => {
  return axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/getWishlist`).then(({ data }) => {
    return { data };
  });
};

const addToWishlistApi = (params) => {
  return axios.put(`${constants.WISHLIST_API_URL}/api/v1/wishlist/create`, params).then(({ data }) => {
    toast.success('Item added to Wishlist');
    return { data };
  });
}

const deleteWishlistApi = (wishlist_id, toastObj = {}) => {
  return axios.post(`${constants.WISHLIST_API_URL}/api/v1/wishlist/delete?wishlist_id=${wishlist_id}`, {}).then(({ data }) => {
    // return { data };
    if (toastObj.showToast) {
      toast.success('Item removed from Wishlist');
    }
    return getWishlistApi();
  });
}

const notifyMe = params => axios.post(`${constants.WISHLIST_API_URL}/api/v1/alert/stock/srp`, params)
  .then((res) => {
    toast.success('Will be notified soon');
    return res;
  });
  const track = (params) => {
    if (params.hasOwnProperty("wishlistId")) {
      for (var i = 0; i < params.postResult.length; i++) {
        if (params.postResult[i].wishlist_id === params.wishlistId) {
          window.appEventData.push({
            "event": params.eventName,
            "cart": {
              "item": params.postResult[i],
            }
          });
        }
      }
    } else if (params.hasOwnProperty("params")) {
      window.appEventData.push({
        "event": params.eventName,
        "cart": {
          "item": params.params.product_id,
        }
      });
    } else {
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
