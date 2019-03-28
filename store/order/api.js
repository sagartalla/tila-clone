import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getOrderDetails = ({ orderId }) => {
  return axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/details/${orderId}?include_state_times=true&include_payments=true&grouped=true&include_item_history=true&include_refunds=true&include_return_exchange=true`)
}

const getReasons = (params) => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/reasons?order_item_id=${params.orderItemId}`);

const submitCancelRequest = (params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order_item/delivery/${params.orderItemId}/request_cancel`, {
  reason: params.reason,
  comment: params.comment,
  sub_reasons: params.subReason,
});

const submitReturnRequest = (params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/return`,params);
const getExchangeVariants = (params) => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/exchange_options?order_item_id=${params.orderItemId}`)

const sendMapDataApi = (order_id, params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/${order_id}/address/geo`, params);

const getRefundOptions = (orderItemId) => axios.get(`${constants.ORDERS_API_URL}/api/v1/order_item/${orderItemId}/refund_options`)

const setExchangeOrder = (params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/exchange`,params)

export default { getOrderDetails, getRefundOptions, getReasons, submitCancelRequest, submitReturnRequest, getExchangeVariants, sendMapDataApi,setExchangeOrder };
