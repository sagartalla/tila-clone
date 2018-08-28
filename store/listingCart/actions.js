import api from './api';

const actions = {
  LISTING_GET_CART_DETAILS: 'LISTING_GET_CART_DETAILS',
  LISTING_ADD_TO_CART: 'LISTING_ADD_TO_CART',
  LISTING_REMOVE_CART_ITEM: 'LISTING_REMOVE_CART_ITEM',
  LISTING_CART_ITEM_COUNT: 'LISTING_CART_ITEM_COUNT',
  LISTING_ADD_REMOVE_GIFT: 'LISTING_ADD_REMOVE_GIFT',
  LISTING_RESET_ADD_TO_CART: 'LISTING_RESET_ADD_TO_CART'
};

const actionCreators = {
  addToCart: (params, listingId) => {
    return {
      type: actions.LISTING_ADD_TO_CART,
      payload: api.addToCart(params, listingId)
    }
  },
  // getListingCartResults: (params) => {
  //   return ({
  //     type: actions.LISTING_GET_CART_DETAILS,
  //     payload: api.getListingCartDetailsApi(params)
  //   })
  // },
  removeCartItem: (cartId) => {
    const params = {
      "cart_item_id": cartId
    }
    return ({
      type: actions.LISTING_REMOVE_CART_ITEM,
      payload: api.removeCartItemApi(params)
    })
  },
  cartItemCount: (cartId, typ, listingId) => {
    const params = {
      "cart_item_id": cartId
    }
    return ({
      type: actions.LISTING_CART_ITEM_COUNT,
      payload: api.cartItemCountApi(params, typ, listingId)
    })
  },
  // addOrRemoveGift: (cartItemId, typ) => {
  //   return {
  //     type: actions.LISTING_ADD_REMOVE_GIFT,
  //     payload: api.giftApi(cartItemId, typ)
  //   }
  // },
  // resetAddtoCart: () => ({
  //   type: actions.LISTING_RESET_ADD_TO_CART
  // })
};

export { actions, actionCreators };
