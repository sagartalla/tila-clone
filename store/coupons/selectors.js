
const getCouponOffers = (store) => {
  if (store.couponOffersData.couponData) {
    return store.couponOffersData.couponData;
  }
};

export { getCouponOffers };
