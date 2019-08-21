import axios from 'axios';
import Cookies from 'universal-cookie';

import constants from '../helper/constants';

const cookies = new Cookies();

// const getPage = ({page, id}) => axios.get(`${constants.PCM_URL}/cms/${page}`);
const getPage = ({ page, id, published = true }) => axios.get(`${constants.PCM_URL}/cms/${page}?id_attribute=${id}&published=${published}`);

const getListings = (params, index) => {
  // const shippingData = cookies.get('shippingInfo');
  // const { city: shippingCity } = shippingData || {};

  const options = {
    language: cookies.get('language'),
    country_code: cookies.get('country'),
    size: 'SMALL',
    listing_ids: params.map(a => a.listing_id),
    // city_code: shippingCity,
    flags: {
      catalog_details: true,
      include_offers: true,
      include_policies: true,
      shipping: true,
    },
  };
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/`, options).then(res => ({
    res,
    index,
  }));
};

const getRecentlyViewedAll = () => axios.get(`${constants.WISHLIST_API_URL}/api/v1/recently/viewed/item/getAll?page=0&size=20`);

export default {
  getPage,
  getListings,
  getRecentlyViewedAll,
};
