import axios from 'axios';
import { toast } from 'react-toastify';
import constants from '../../helper/constants';

const getWishlistApi = (currentPage=0) => {
  return axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/getWishlist?size=10&page=${currentPage}`).then(({ data }) => {
    return { data };
  });
};

const addToWishlistApi = (params) => {
  return axios.put(`${constants.WISHLIST_API_URL}/api/v1/wishlist/create`, params).then(({ data }) => {
    toast.success('Item added to Wishlist');
    return { data };
  });
}

const deleteWishlistApi = (wishlist_id, toastObj = {},currentPage) => {
  return axios.post(`${constants.WISHLIST_API_URL}/api/v1/wishlist/delete?wishlist_id=${wishlist_id}`, {}).then(({ data }) => {
    // return { data };
    if (toastObj.showToast) {
      toast.success('Item removed from Wishlist');
    }
    return getWishlistApi(currentPage);
  });
}

const notifyMe = params => axios.post(`${constants.WISHLIST_API_URL}/api/v1/alert/stock/srp`, params)
  .then((res) => {
    toast.success('Will be notified soon');
    return res;
  });

export default {
  getWishlistApi, addToWishlistApi, deleteWishlistApi, notifyMe,
};
