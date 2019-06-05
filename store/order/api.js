import axios from 'axios';
import constants from '../helper/constants';

const getOrderDetails = ({ orderId }) => axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/details/${orderId}?include_state_times=true&include_payments=true&grouped=true&include_item_history=true&include_refunds=true&include_return_exchange=true`);

const getReasons = (params, reasonType='return') => {
  if(reasonType === 'exchange') {
    return getExchangeReasons(params)
  }
  return axios.get(`${constants.ORDERS_API_URL}/api/v1/${reasonType}/reasons?order_item_id=${params.orderItemId}`);
}
const getExchangeReasons = (params) => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/exchange_reasons?order_item_id=${params.orderItemId}`)

const submitCancelRequest = params => axios.post(`${constants.ORDERS_API_URL}/api/v1/order_item/delivery/${params.orderItemId}/request_cancel`, {
  reason: params.reason,
  comment: params.comment,
  sub_reasons: params.subReason,
  refund_mode: params.refund_mode
});

const submitReturnRequest = params => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/return`, params);
const getExchangeVariants = params => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/exchange_options?order_item_id=${params.orderItemId}`);

const sendMapDataApi = (order_id, params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/${order_id}/address/geo`, params);

const getRefundOptions = (orderItemId, issueType) => axios.get(`${constants.ORDERS_API_URL}/api/v1/order_item/${orderItemId}/refunds_options/${issueType}`);

const setExchangeOrder = params => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/exchange`, params);

const track = ({ event, orderData }) => {
  window.dataLayer.push({ event: 'purchase' });
  window.appEventData.push({
    event,
    transaction: {
      transactionID: orderData.payment_id,
      total: {
        currency: orderData.currency_code,
        salesTax: '',
      },
      profile: {
        address: {
          stateProvince: orderData.address.city,
          postalCode: orderData.address.postal_code,
        },
      },
      // Collection of Payment Objects
      payment: {
        paymentMethod: orderData.payments.map(payment => payment.payment_mode).join(','),
        paymentAmount: orderData.payments.map(payment => payment.amount).join(','),
      },
      // Collection of Item Objects
      item: orderData.order_items.map(item => item.variant_info.product_id),
    },
  });
};

const getTrackingDetails = trackingId => axios.get(`${constants.LOGISTICS_URL}/api/shipment/v1/track/${trackingId}`);

export default {
  getOrderDetails,
  getRefundOptions,
  getReasons,
  submitCancelRequest,
  getTrackingDetails,
  submitReturnRequest,
  getExchangeVariants,
  sendMapDataApi,
  setExchangeOrder,
  track,
};
