import apis from './api';
import { actionCreators as cartActionCreators } from '../../cart/actions';
import loginReq from '../../helper/loginReq';

const actions = {
  GET_WISHLIST: 'GET_WISHLIST',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  DELETE_TO_WISHLIST: 'DELETE_TO_WISHLIST',
  ADD_TO_CART: 'ADD_TO_CART',
  NOTIFY_ME: 'NOTIFY_ME',
  WISHLIST_TRACK: 'WISHLIST_TRACK',
  WISHLIST_PRODUCTS: 'WISHLIST_PRODUCTS',
  GET_RECENTLY_VIEWED: 'GET_RECENTLY_VIEWED',
  ADD_TO_RECENTLY_VIEWED: 'ADD_TO_RECENTLY_VIEWED',
};

const actionCreators = {
  getWishlist: loginReq((currentPage, size) => (dispatch, getState) => {
    const state = getState();
    return dispatch({
      type: actions.GET_WISHLIST,
      payload: apis.getWishlistApi(currentPage || state.currentPage, size)
    });
  }),
  addToWishlist: loginReq(params => dispatch => dispatch({
    type: actions.ADD_TO_WISHLIST,
    payload: apis.addToWishlistApi(params),
  }).then(() => dispatch(actionCreators.getWishlist()))),
  deleteWishlist: loginReq((wishlist_id, showToast, currentPage) => (dispatch, getState) => {
    const state = getState().wishlistReducer;
    dispatch(actionCreators.track({ eventName: 'WishList Remove', wishlistId: wishlist_id }));
    return dispatch({
      type: actions.DELETE_TO_WISHLIST,
      payload: apis.deleteWishlistApi(wishlist_id, showToast, currentPage || state.currentPage),
    }).then(() => dispatch(actionCreators.getWishlistProducts()));
  }),
  addToCart: (params, wishlist_id, getCartData) => (dispatch, getState) => dispatch(cartActionCreators.addToCart(params)).then(() => {
    if (getCartData) {
      dispatch(actionCreators.deleteWishlist(wishlist_id, {
        showToast: false,
      })).then(() => {
        dispatch(cartActionCreators.getCartResults({}));
      });
    } else {
      dispatch(actionCreators.deleteWishlist(wishlist_id, { showToast: false }));
      dispatch(actionCreators.track({
        eventName: 'Product Added', wishlistId: wishlist_id,
      }));
    }
  }),
  addToWishlistAndFetch: loginReq(params => dispatch => dispatch(actionCreators.addToWishlist(params)).then(() => {
    dispatch(actionCreators.getWishlistProducts());
    dispatch(actionCreators.track({
      eventName: 'WishList Added', params, type: 'WL_ADD',
    }));
  })),
  notifyMe: params => (dispatch) => {
    dispatch(actionCreators.track({ eventName: 'Notify Me', type: 'NOTIFY', params }));
    dispatch({
      type: actions.NOTIFY_ME,
      payload: apis.notifyMe(params),
    });
  },
  wishlistNotify: wishlistId => (dispatch) => {
    dispatch(actionCreators.track({ eventName: 'Notify Me', type: 'NOTIFY', params: { wishlistId } }));
    dispatch({
      type: actions.NOTIFY_ME,
      payload: apis.wishlistNotify(wishlistId),
    });
  },
  track: params => (dispatch, getState) => {
    const state = getState();
    params.postResult = state.wishlistReducer.products;
    return {
      type: actions.WISHLIST_TRACK,
      payload: apis.track(params),
    };
  },
  getWishlistProducts: loginReq(() => dispatch => dispatch({
    type: actions.WISHLIST_PRODUCTS,
    payload: apis.getWishlistProducts(),
  })),
  getRecentlyViewed: loginReq(() => (dispatch) => {
    dispatch({
      type: actions.GET_RECENTLY_VIEWED,
      payload: apis.getRecentlyViewed(),
    });
  }),
  addProductToRV: loginReq(variantId => (dispatch) => {
    dispatch({
      type: actions.ADD_TO_RECENTLY_VIEWED,
      payload: apis.addProductToRV(variantId),
    });
  }),
};

export { actions, actionCreators };
