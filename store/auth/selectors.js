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

const getPTAToken = (store) => {
  return store.authReducer.data.ptaToken;
}

const getShowLogin = (store) => {
  return store.authReducer.ui.showLogin;
}

const showEmailVerificationScreen = (store) => {
  return store.authReducer.ui.showEmailVerificationScreen;
};

const getUserInfo = (store) => {
  return store.authReducer.data.userInfoData;
};

const getDomainCountries = store => store.authReducer.data.domainCountries;


// new selectors
const getActive = store => store.authReducer.v2.active;

const getActiveEmailId = store => store.authReducer.v2.data.email || '';

export {
  getErrorMessege, getCountry, getLoggedInStatus, getInstaCode, getUserCreds, getDeliveryCity, getDomainCountries,
  getLoginProgressStatus, getShowLogin, getPTAToken, showEmailVerificationScreen, getLanguage, getLoadingStatus, getUserInfo,
  getActive, getActiveEmailId,
};
