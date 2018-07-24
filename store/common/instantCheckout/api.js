import axios from 'axios';
import constants from '../../helper/constants';

const doInstantCheckoutApi = (params) => {
  return axios.post(`${constants.ORDERS_API_URL}/api/v1/instant_checkout`, params).then(({ data }) => {
    return data;
  });
};

export default { doInstantCheckoutApi };