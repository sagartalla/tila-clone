import fp, * as _ from 'lodash/fp';

const getErrorMessege = (store) => {
  return store.authReducer.error;
}

const getLoggedInStatus = (store) => {
  return store.authReducer.data.isLoggedIn
}

const getUserCreds = (store) => {
  return store.authReducer.data.userCreds
}

export { getErrorMessege, getLoggedInStatus, getUserCreds };
