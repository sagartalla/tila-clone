import api from './api';

const actions = {
  GET_CART_DETAILS: 'GET_CART_DETAILS'
};

const actionCreators = {
  getCartResults: (params) => {
    return ({
      type: actions.GET_CART_DETAILS,
      payload: api.getOrderDetailsApi(params)
    })
  }
};

export { actions, actionCreators };

