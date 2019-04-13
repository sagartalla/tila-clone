const getErrorMessege = (store) => {
  return store.authReducer.error ? JSON.stringify(store.authReducer.error) : '';
}

const getLoginProgressStatus = (store) => {
  return store.authReducer.ui.loginLoading;
}

const getLoadingStatus = (store) => {
  return store.authReducer.ui.loading;
};

const getCountry = (store) => {
  return store.authReducer.data.country
}

const getLanguage = (store) => {
  return store.authReducer.data.language
}

const getLoggedInStatus = (store) => {
  return store.authReducer.data.isLoggedIn
}

const getInstaCode  = (store) => {
  return store.authReducer.data.instagramCode || null
}

const getUserCreds = (store) => {
  return store.authReducer.data.userCreds
}

const getDeliveryCity = (store) => {
  return store.authReducer.data.geoShippingDetails;
}

// const getAutoCompleteCityData = (store) => {
//   const data = store.productReducer.allCitiesData;
//   const params = store.authReducer.autoCompleteCity;
//   return params ? data.filter(item => item.city_name.toLowerCase().indexOf(params.toLowerCase()) > -1) : data;
// }

const getPTAToken = (store) => {
  return store.authReducer.data.ptaToken;
}

const getShowLogin = (store) => {
  return store.authReducer.ui.showLogin;
}

const showEmailVerificationScreen = (store) => {
  return store.authReducer.ui.showEmailVerificationScreen;
}

export { getErrorMessege, getCountry, getLoggedInStatus, getInstaCode, getUserCreds, getDeliveryCity, getLoginProgressStatus, getShowLogin, getPTAToken, showEmailVerificationScreen, getLanguage, getLoadingStatus };
