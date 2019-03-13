import axios from 'axios';
import constants from '../../helper/constants';

const getAllCoupons = countryCode =>
  axios.get(`${constants.COUPONS_URL}/offer/coupons?countryCode=${countryCode}`);


export default { getAllCoupons };
