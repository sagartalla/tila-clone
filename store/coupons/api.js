import axios from 'axios';
import constants from '../helper/constants';

const getAllCoupons = countryCode =>
  axios.get(`${constants.COUPONS_URL}/offer/coupons?countryCode=${countryCode}`);

const showTerms = (docId) => {
  const url = `${constants.TRANSFORMERS_SERVICE_URL}/fpts/document-service/fetch-url?${docId}`;

  axios({
    url,
    method: 'get',
    headers: {
      tenant: 'incentive-engine',
    },
  });
};

export default { getAllCoupons, showTerms };
