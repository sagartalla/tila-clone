const getErrorMessege = (store) => {
  return store.authReducer.error;
}

const getCountry = (store) => {
  store.authReducer.data.country
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

export { getErrorMessege, getCountry, getLoggedInStatus, getUserCreds, getDeliveryCity, getAutoCompleteCityData };
