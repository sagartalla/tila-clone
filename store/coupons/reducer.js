import typeToReducer from 'type-to-reducer';
import { actions } from './action';

const initialState = {
  loader: false,
};
const couponOffersData = typeToReducer({
  [actions.COUPON_OFFERS]: {
    PENDING: state => ({
      ...state,
      loader: true,
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        couponData: payload.data,
        loader: false,
      };
    },
    REJECTED: state => (
      {
        ...state,
        loader: false,
      }),
  },
  [actions.COUPON_DATA]: {
    PENDING: state => ({
      ...state,
      loader: true,
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        couponDataList: payload.data,
        loader: false,
      };
    },
    REJECTED: state => (
      {
        ...state,
        loader: false,
      }),
  },
}, initialState);

export default couponOffersData;
