import axios from 'axios';
import constants from '../helper/constants';


const getOrderStatusDetails = (order_id) => {
  return axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/details/${order_id}`).then(({ data }) => {
    return { data };
  });
};


export default { getOrderStatusDetails };
