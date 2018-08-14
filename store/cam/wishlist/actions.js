import apis from './api';
import { actionCreators as cartActionCreators } from '../../cart/actions';
import loginReq from '../../helper/loginReq';

const actions = {
  GET_WISHLIST: 'GET_WISHLIST',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  DELETE_TO_WISHLIST: 'DELETE_TO_WISHLIST',
  ADD_TO_CART: 'ADD_TO_CART',
};

const actionCreators = {
  getWishlist: loginReq(() => (dispatch, getState) => {
    return dispatch({
      type: actions.GET_WISHLIST,
      payload: apis.getWishlistApi(),
    });
  }),
  addToWishlist: loginReq((params) => {
    return ({
      type: actions.ADD_TO_WISHLIST,
      payload: apis.addToWishlistApi(params),
    });
  }),
  deleteWishlist: loginReq((wishlist_id) => {
    return ({
      type: actions.DELETE_TO_WISHLIST,
      payload: apis.deleteWishlistApi(wishlist_id),
    });
  }),
  addToCart: loginReq((params, wishlist_id) => (dispatch, getState) => {
    return dispatch(cartActionCreators.addToCart(params)).then(() => {
      dispatch(actionCreators.deleteWishlist(wishlist_id));
    })
  }),
  addToWishlistAndFetch: loginReq((params) => (dispatch, getState) => {
    return dispatch(actionCreators.addToWishlist(params)).then(() => {
      dispatch(actionCreators.getWishlist());
    })
  })
};

export { actions, actionCreators };
