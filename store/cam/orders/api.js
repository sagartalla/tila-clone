import axios from 'axios';
import constants from '../../helper/constants';

const getOrderHistory = () => axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/history`);

export default { getOrderHistory };