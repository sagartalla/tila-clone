import axios from 'axios';
import constants from '../../helper/constants';

const getWishlistApi = () => {
  return axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/getWishlist`).then(({ data }) => {
    return { data };
  });
};

const addToWishlistApi = (params) => {
  return axios.put(`${constants.WISHLIST_API_URL}/api/v1/wishlist/create`, params).then(({ data }) => {
    return { data };
  });
}

const deleteWishlistApi = (wishlist_id) => {
  return axios.post(`${constants.WISHLIST_API_URL}/api/v1/wishlist/delete?wishlist_id=${wishlist_id}`, {}).then(({ data }) => {
    // return { data };

    return getWishlistApi();
  });
}

export default { getWishlistApi, addToWishlistApi, deleteWishlistApi };
