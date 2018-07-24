const getInstantCheckoutResData = (store) => {
  if (store.instantCheckoutReducer.data && store.instantCheckoutReducer.data.orderRes) {
    return store.instantCheckoutReducer.data;
  }
  return {};
}


export { getInstantCheckoutResData };