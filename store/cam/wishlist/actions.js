import apis from './api';
import { actionCreators as cartActionCreators } from '../../cart/actions';
import loginReq from '../../helper/loginReq';

const actions = {
  GET_WISHLIST: 'GET_WISHLIST',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  DELETE_TO_WISHLIST: 'DELETE_TO_WISHLIST',
  ADD_TO_CART: 'ADD_TO_CART',
  NOTIFY_ME: 'NOTIFY_ME',
};

const actionCreators = {
  getWishlist: loginReq(() => (dispatch, getState) => dispatch({
    type: actions.GET_WISHLIST,
    payload: apis.getWishlistApi(),
  })),
  addToWishlist: loginReq(params => ({
    type: actions.ADD_TO_WISHLIST,
    payload: apis.addToWishlistApi(params),
  })),
  deleteWishlist: loginReq((wishlist_id, showToast) => ({
    type: actions.DELETE_TO_WISHLIST,
    payload: apis.deleteWishlistApi(wishlist_id, showToast),
  })),
  addToCart: (params, wishlist_id, getCartData) => (dispatch, getState) => dispatch(cartActionCreators.addToCart(params)).then(() => {
    if (getCartData) {
      dispatch(actionCreators.deleteWishlist(wishlist_id, {
        showToast: false,
      })).then(() => {
        dispatch(cartActionCreators.getCartResults({}));
      });
    } else {
      dispatch(actionCreators.deleteWishlist(wishlist_id, { showToast: false }));
    }
  }),
  addToWishlistAndFetch: loginReq(params => dispatch => dispatch(actionCreators.addToWishlist(params)).then(() => {
    dispatch(actionCreators.getWishlist());
  })),
  notifyMe: (params => ({
    type: actions.NOTIFY_ME,
    payload: apis.notifyMe(params),
  })),
};

export { actions, actionCreators };
