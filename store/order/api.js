import _ from 'lodash';
import { orderServiceInstance } from '../helper/services';

const getOrderDetails = ({ orderId }) => {
  return orderServiceInstance.get(`/api/v1/customer/order/details/${orderId}`)
}

const getReasons = () => orderServiceInstance.get('/api/v1/return/reasons');

export default { getOrderDetails };