const getErrorMessege = (store) => {
  return store.authReducer.error;
}

const getLoggedInStatus = (store) => {
  return store.authReducer.data.isLoggedIn
}

const getUserCreds = (store) => {
  return store.authReducer.data.userCreds
}

const getCity = (store) => {
  return store.authReducer.data.geoShippingDetails;
}

const getAutoCompleteCityData = (store) => {
  return store.authReducer.data.autoCompleteCity;
}

export { getErrorMessege, getLoggedInStatus, getUserCreds, getCity, getAutoCompleteCityData };
