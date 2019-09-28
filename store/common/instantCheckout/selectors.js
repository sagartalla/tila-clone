const getInstantCheckoutResData = (store) => {
  if (store.instantCheckoutReducer.data && (store.instantCheckoutReducer.data.redirect_url ||  store.instantCheckoutReducer.data.iframe_url)) {
    return store.instantCheckoutReducer.data;
  }
  return {};
}

const showLoading = (store) => {
    return store.instantCheckoutReducer.ui.loading;
}

const getCODStatus = (store) => {
  return store.instantCheckoutReducer.selectedCOD;
}

export { getInstantCheckoutResData, showLoading, getCODStatus };
