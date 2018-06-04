import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getOrderDetails = ({ orderId }) => {
  return axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/details/${orderId}`)
}

export default { getOrderDetails };