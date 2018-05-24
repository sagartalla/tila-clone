import api from './api';

const actions = {
  GET_CART_DETAILS: 'GET_CART_DETAILS',
  ADD_TO_CART: 'ADD_TO_CART'
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
      payload: api.getOrderDetailsApi(params)
    })
  }
};

export { actions, actionCreators };

