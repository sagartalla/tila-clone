import typeToReducer from 'type-to-reducer';
import { actions } from './action';

const initialState = {
};
const couponOffersData = typeToReducer({
  [actions.COUPON_OFFERS]: {
    PENDING: state => ({
      ...state,
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        couponData: payload.data,
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
}, initialState);

export default couponOffersData;
