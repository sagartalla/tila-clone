
const getCouponOffers = (store) => {
  if (store.couponOffersData.couponData) {
    return store.couponOffersData.couponData;
  }
};

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


export { getCouponOffers, getAllOffers, showLoader };
