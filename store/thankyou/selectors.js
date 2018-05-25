const getFinalOrderDetails = (store)  => {
  if (store.thankyouReducer.data && store.thankyouReducer.data.length > 0) {
    return store.thankyouReducer.data;
  }
  return {};
}

export { getFinalOrderDetails };