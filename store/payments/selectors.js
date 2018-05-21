const getPaymentOptions = (store) => {
  if (store.paymentsReducer.data && store.paymentsReducer.data.orderRes) {
    return store.paymentsReducer.data;
  }
  return {};
}

export { getPaymentOptions };