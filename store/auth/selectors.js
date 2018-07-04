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
  return store.authReducer.data.geoDetails.city;
}

export { getErrorMessege, getLoggedInStatus, getUserCreds, getCity };
