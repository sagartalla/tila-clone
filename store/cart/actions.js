import api from './api';

const actions = {
  GET_CART_DETAILS: 'GET_CART_DETAILS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  CART_ITEM_COUNT: 'CART_ITEM_COUNT',
  ADD_REMOVE_GIFT: 'ADD_REMOVE_GIFT',
  RESET_ADD_TO_CART: 'RESET_ADD_TO_CART'
};

const actionCreators = {
  addToCart: (params) => {
    return {
      type: actions.ADD_TO_CART,
      payload: api.addToCart(params)
    }
  },
  getCartResults: (params) => {
    return ({
      type: actions.GET_CART_DETAILS,
      payload: api.getCartDetailsApi(params)
    })
  },
  removeCartItem: (cartId) => {
    const params = {
      "cart_item_id": cartId
    }
    return ({
      type: actions.REMOVE_CART_ITEM,
      payload: api.removeCartItemApi(params)
    })
  },
  cartItemCount: (cartId, typ) => {
    const params = {
      "cart_item_id": cartId
    }
    return ({
      type: actions.CART_ITEM_COUNT,
      payload: api.cartItemCountApi(params, typ)
    })
  },
  addOrRemoveGift: (cartItemId, typ) => {
    return {
      type: actions.ADD_REMOVE_GIFT,
      payload: api.giftApi(cartItemId, typ)
    }
  },
  resetAddtoCart: () => ({
    type: actions.RESET_ADD_TO_CART
  }),

  addToCartAndFetch: (params) => (dispatch, getState) => {
    return dispatch(actionCreators.addToCart(params)).then(() => {
      dispatch(actionCreators.getCartResults());
    })
  }
};

export { actions, actionCreators };
