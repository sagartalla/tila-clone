import axios from 'axios';
import constants from '../../helper/constants';

const getWishlistApi = () => {
  return axios.get(`${constants.WISHLIST_API_URL}/api/v1/wishlist/getWishlist`).then(({ data }) => {
    console.log(data);
    return { data };
  });
};

export default { getWishlistApi };
