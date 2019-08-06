import axios from 'axios';
import constants from '../helper/constants';

const getAllCoupons = countryCode =>
  axios.get(`${constants.COUPONS_URL}/offer/coupons?countryCode=${countryCode}`);

const getCoupons = (countryCode, currentPage, expired) =>
  axios.get(`${constants.COUPONS_URL}/offer/v1/coupons?countryCode=${countryCode}&page=${currentPage}&size=10&expired=${expired}`);

export default { getAllCoupons, getCoupons };
