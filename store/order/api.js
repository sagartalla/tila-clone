import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getOrderDetails = ({ orderId }) => {
  return axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/details/${orderId}`)
}

const getReasons = () => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/reasons`);

const submitCancelRequest = (params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order_item/delivery/${params.orderItemId}/request_cancel`, {
  reason: params.reason,
  comment: params.comment
}, {
  'X-USER-NAME': 'sdfg'
});

export default { getOrderDetails, getReasons, submitCancelRequest };