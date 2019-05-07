
import api from './api';

const actions = {
  COUPON_OFFERS: 'COUPON_OFFERS',
  COUPON_DATA: 'COUPON_DATA',
};


const actionCreators = {
  getCouponOffers: params => ({
    type: actions.COUPON_OFFERS,
    payload: api.getAllCoupons(params),
  }),

  getCoupons: (countryCode, currentPage, expired) => ({
    type: actions.COUPON_DATA,
    payload: api.getCoupons(countryCode, currentPage, expired),
  }),
};
export { actions, actionCreators };

