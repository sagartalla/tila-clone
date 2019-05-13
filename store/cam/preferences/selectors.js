
const getNotificationPreferences = store => store.preferencesReducer.notifications;

const getAllOffers = (store) => {
  if (store.couponOffersData.couponDataList) {
    return store.couponOffersData.couponDataList;
  }
};

const showLoader = (store) => {
  if (store.couponOffersData.loader) {
    return store.couponOffersData.loader;
  }
};


export { getNotificationPreferences, getAllOffers, showLoader };
