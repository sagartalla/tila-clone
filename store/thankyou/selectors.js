const getFinalOrderDetails = (store) => {
  if (store.thankyouReducer.data) {
    return store.thankyouReducer.data;
  }
  return {};
}

export { getFinalOrderDetails };