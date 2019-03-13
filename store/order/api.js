import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getOrderDetails = ({ orderId }) => {
  return axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/details/${orderId}?include_state_times=true&include_payments=true&grouped=true`)
}

const getReasons = (params) => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/reasons?order_item_id=${params.orderItemId}`);

const submitCancelRequest = (params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order_item/delivery/${params.orderItemId}/request_cancel`, {
  reason: params.reason,
  comment: params.comment,
  sub_reasons: params.subReason,
});

const submitReturnRequest = (params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/return`, {
  address_id: params.addressId,
  order_item_id: params.orderItemId,
  reason: params.reason,
  comment: selectedReasons.comment,
});

const getExchangeVariants = (params) => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/exchange_options?order_item_id=${params.orderItemId}`)

const sendMapDataApi = (order_id, params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/${order_id}/address/geo`, params);

export default { getOrderDetails, getReasons, submitCancelRequest, submitReturnRequest, getExchangeVariants, sendMapDataApi };
