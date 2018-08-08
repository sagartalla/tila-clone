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

export { getPaymentOptions, getPaymentUrl, getDefaultAddress };