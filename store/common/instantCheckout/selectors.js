const getInstantCheckoutResData = (store) => {
  if (store.instantCheckoutReducer.data && store.instantCheckoutReducer.data.redirect_url) {
    return store.instantCheckoutReducer.data;
  }
  return {};
}

const showLoading = (store) => {
    return store.instantCheckoutReducer.ui.loading;
}

export { getInstantCheckoutResData, showLoading };