import _ from 'lodash';

const getPaymentOptions = (store) => {
  if (store.paymentsReducer.data && store.paymentsReducer.data.orderRes) {
    return store.paymentsReducer.data;
  }
  return {};
}

const getPaymentUrl = (store) => {
  if (store.paymentsReducer.data && store.paymentsReducer.data.payRes) {
    return store.paymentsReducer.data.payRes;
  }
  return {};
}

const getDefaultAddress = (store) => {
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    return _.filter(store.shippingAddrReducer.data, function (value, key) { return value.default; });
  }
  return {};
}

const getPaymentModesData = (store) => {
  /*
    {
      voucherData: {}
      paymentModes: [],
      transaction_id
    }
  */
  if(store.paymentsReducer.data.data) {
    const paymentModesData = store.paymentsReducer.data.data.payment_options_available.reduce((acc, val, key) => {
      if(val.type === "VOUCHER") {
        acc.voucherData = val;
      } else {
        acc.paymentModes[val.type] = val;
      }
      return acc;
    }, {
      voucherData: null,
      paymentModes: {}
    });
    paymentModesData.transaction_id = store.paymentsReducer.data.data.transaction_id;
    return paymentModesData;
  }
  return {
    voucherData: {},
    paymentModes: {}
  }
}

export { getPaymentOptions, getPaymentUrl, getDefaultAddress, getPaymentModesData };
