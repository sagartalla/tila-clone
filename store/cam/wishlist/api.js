import axios from 'axios';
import { toast } from 'react-toastify';
import constants from '../../helper/constants';
import { languageDefinations } from '../../../utils/lang/';

const { API_TEXT } = languageDefinations();

const getWishlistApi = (currentPage = 0) => axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/getWishlist?size=10&page=${currentPage}`).then(({ data }) => {
  return { data };
});

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
  toast.success(API_TEXT.ITEM_ADDED_TO_WISHLIST);
  return { data };
});

const deleteWishlistApi = (wishlist_id, toastObj = {}, currentPage) => axios.post(`${constants.WISHLIST_API_URL}/api/v1/wishlist/delete?wishlist_id=${wishlist_id}`, {}).then(({ data }) => {
  // return { data };
  if (toastObj.showToast) {
    toast.success(API_TEXT.ITEM_REMOVED_FROM_WISHLIST);
  }
  // getWishlistProducts();
  return getWishlistApi(currentPage);
});

const notifyMe = params => axios.post(`${constants.WISHLIST_API_URL}/api/v1/alert/stock/srp`, params).then((res) => {
  toast.success(API_TEXT.WILL_BE_NOTIFIED_SOON);
  return res;
});

export default {
  getWishlistApi, addToWishlistApi, deleteWishlistApi, notifyMe, track, getWishlistProducts,
};
