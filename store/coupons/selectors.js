
const getCouponOffers = (store) => {
  if (store.couponOffersData.couponData) {
    return store.couponOffersData.couponData;
  }
};

const getTermsAndConditions = (store) => {
  if (store.couponOffersData.termsAndConditions) {
    return store.couponOffersData.termsAndConditions;
  }
}

export { getCouponOffers, getTermsAndConditions };
