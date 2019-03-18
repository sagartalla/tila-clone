
import api from './api';

const actions = {
  COUPON_OFFERS: 'COUPON_OFFERS',
};


const actionCreators = {
  getCouponOffers: params => ({
    type: actions.COUPON_OFFERS,
    payload: api.getAllCoupons(params),
  }),
};


export { actions, actionCreators };

