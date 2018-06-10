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
});

const submitReturnRequest = (params) => axios.post(`${constants.ORDERS_API_URL}api/v1/order/return`, {
  address_id: params.addressId,
  order_item_id: params.orderItemId,
  reason: params.reason,
  comment: selectedReasons.comment,
});


export default { getOrderDetails, getReasons, submitCancelRequest, submitReturnRequest };
