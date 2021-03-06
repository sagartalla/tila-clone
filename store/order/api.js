import axios from 'axios';
import constants from '../helper/constants';

const getOrderDetails = ({ orderId }) => axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/details/${orderId}?include_state_times=true&include_payments=true&grouped=true&include_item_history=true&include_refunds=true&include_return_exchange=true`);
const submitClaimWarranty = (params) => {
  return axios.post(`${constants.ORDERS_API_URL}/api/v1/warranty_claim/request`, params)
}
const getReasons = (params, reasonType='return') => {
  if(reasonType === 'exchange') {
    return getExchangeReasons(params)
  }
  if(reasonType === 'claimWarranty'){
    return getWarrantyReason(params)
  }
  return axios.get(`${constants.ORDERS_API_URL}/api/v1/${reasonType}/reasons?order_item_id=${params.orderItemId}`);
}
const getWarrantyReason = params => {
  return axios.get(`${constants.POLICY_URL}/reason/?listing_id=${params}`)
}
const getExchangeReasons = (params) => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/exchange_reasons?order_item_id=${params.orderItemId}`)

const submitCancelRequest = params => axios.post(`${constants.ORDERS_API_URL}/api/v1/order_item/delivery/${params.orderItemId}/request_cancel`, {
  reason: params.reason,
  comment: params.comment,
  sub_reasons: params.subReason,
  refund_mode: params.refund_mode,
});

const submitReturnRequest = params => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/return`, params);
const getExchangeVariants = params => axios.get(`${constants.ORDERS_API_URL}/api/v1/return/exchange_options?order_item_id=${params.orderItemId}`);

const sendMapDataApi = (order_id, params) => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/${order_id}/address/geo`, params);

const getRefundOptions = (orderItemId, issueType) => axios.get(`${constants.ORDERS_API_URL}/api/v1/order_item/${orderItemId}/refunds_options/${issueType}`);

const setExchangeOrder = params => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/exchange`, params);
const setReplaceOrder = params => axios.post(`${constants.ORDERS_API_URL}/api/v1/order/replace`, params);

const track = ({
  event,
  orderData,
}) => {
  switch (event) {
    case 'Order Placed':
      orderData.payments[0].trasactionId = orderData.payment_id;
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
          payment: orderData.payments,
          // Collection of Item Objects
          item: orderData.order_items,
        },
      });
      break;
    case 'CANCEL_ORDER':
      window.appEventData.push({
        event,
        product: [{
          productInfo: {
            productID: orderData,
          },
        } ],
      });
      break;
    default:
      break;
  }
};

const getTrackingDetails = trackingId => axios.get(`${constants.LOGISTICS_URL}/api/shipment/v1/track/${trackingId}`);

const getInvoice = orderId => axios.get(`${constants.ORDERS_API_URL}/api/v1/customer/order/${orderId}/invoice`);

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
  getInvoice,
  track,
  submitClaimWarranty,
  setReplaceOrder,
};
