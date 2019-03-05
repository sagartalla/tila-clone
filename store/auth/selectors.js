const getErrorMessege = (store) => {
  return store.authReducer.error ? JSON.stringify(store.authReducer.error) : '';
}

const getLoginProgressStatus = (store) => {
  return store.authReducer.ui.loginLoading;
}

const getCountry = (store) => {
  return store.authReducer.data.country
}

const getLanguage = (store) => {
  return store.authReducer.data.language
}

const getLoggedInStatus = (store) => {
  return store.authReducer.data.isLoggedIn
}

const getUserCreds = (store) => {
  return store.authReducer.data.userCreds
}

const getDeliveryCity = (store) => {
  return store.authReducer.data.geoShippingDetails;
}

const getAutoCompleteCityData = (store) => {
  return store.authReducer.data.autoCompleteCity;
}

const getPTAToken = (store) => {
  return store.authReducer.data.ptaToken;
}

const getShowLogin = (store) => {
  return store.authReducer.ui.showLogin;
}

export { getErrorMessege, getCountry, getLoggedInStatus, getUserCreds, getDeliveryCity, getAutoCompleteCityData, getLoginProgressStatus, getShowLogin, getPTAToken, getLanguage};
