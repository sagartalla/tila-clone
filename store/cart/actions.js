import api from './api';

const actions = {
  GET_CART_DETAILS: 'GET_CART_DETAILS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  CART_ITEM_COUNT: 'CART_ITEM_COUNT',
  ADD_REMOVE_GIFT: 'ADD_REMOVE_GIFT',
  RESET_ADD_TO_CART: 'RESET_ADD_TO_CART',
  SHOW_CART_BUTTON_LOADER: 'SHOW_CART_BUTTON_LOADER',
  HIDE_CART_BUTTON_LOADER: 'HIDE_CART_BUTTON_LOADER',
  CART_TRACK: 'CART_TRACK',
};

const actionCreators = {
  addToCart: (params) => {
    return {
      type: actions.ADD_TO_CART,
      payload: api.addToCart(params),
    };
  },
  getCartResults: (params) => {
    return ({
      type: actions.GET_CART_DETAILS,
      payload: api.getCartDetailsApi(params),
    });
  },
  removeCartItem: (cartId, showToast) => (dispatch,getState) => {
    dispatch(actionCreators.track({ eventName: 'CART_REMOVE', cartId }));
    const params = {
      cart_item_id: cartId,
    };
    return dispatch({
      type: actions.REMOVE_CART_ITEM,
      payload: api.removeCartItemApi(params, showToast),
    });
  },
  cartItemCount: (cartId, type) => (dispatch,getState) => {
    dispatch(actionCreators.track({ eventName: 'CART_QTY_CHANGE', cartId, type }));
    const params = {
      cart_item_id: cartId,
    };
    return dispatch({
      type: actions.CART_ITEM_COUNT,
      payload: api.cartItemCountApi(params, type),
    });
  },
  cartItemInputCount: (cartId, type, val) => {
    const params = {
      cart_item_id: cartId,
      count: val,
    };
    return ({
      type: actions.CART_ITEM_COUNT,
      payload: api.cartItemCountApi(params, type),
    });
  },
  addOrRemoveGift: (cartItemId, typ, params) => ({
    type: actions.ADD_REMOVE_GIFT,
    payload: api.giftApi(cartItemId, typ, params),
  }),
  resetAddtoCart: () => ({
    type: actions.RESET_ADD_TO_CART,
  }),

  showBtnLoader: params => ({
    type: actions.SHOW_CART_BUTTON_LOADER,
    params,
  }),

  hideBtnLoader: params => ({
    type: actions.HIDE_CART_BUTTON_LOADER,
    params,
  }),

  addToCartAndFetch: params => (dispatch, getState) => {
    dispatch(actionCreators.track({ ...params, eventName: 'ADD_TO_CART' }));
    dispatch(actionCreators.showBtnLoader(params));
    return dispatch(actionCreators.addToCart(params)).then(() => {
      dispatch(actionCreators.getCartResults());
      dispatch(actionCreators.hideBtnLoader(params));
    });
  },
  track: params => (dispatch, getState) => {
    const state = getState();
    params.postResult = state.cartReducer.data.items;
    return {
      type: actions.CART_TRACK,
      payload: api.track(params),
    };
  },
};

export { actions, actionCreators };
