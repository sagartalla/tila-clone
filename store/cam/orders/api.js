import axios from 'axios';
import constants from '../../helper/constants';

const getOrderHistory = currentPage =>
  axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/history?grouped=true&order_type=PURCHASE&order_type=EXCHANGE&page=${currentPage}`);

export default { getOrderHistory };
