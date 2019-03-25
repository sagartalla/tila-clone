
import api from './api';

const actions = {
  COUPON_OFFERS: 'COUPON_OFFERS',
  SHOW_TERMS: 'SHOW_TERMS',  
};


const actionCreators = {
  getCouponOffers: params => ({
    type: actions.COUPON_OFFERS,
    payload: api.getAllCoupons(params),
  }),
  showTermsAndConditions: docId => ({
    type: actions.SHOW_TERMS,
    payload: api.showTerms(docId),
  }),
};

export { actions, actionCreators };

