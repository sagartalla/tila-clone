import api from './api';

const actions = {
  GET_PRODUCT: 'GET_PRODUCT',
};

const actionCreaters = {
  getProduct: (params) => {
    return ({
      type: actions.GET_PRODUCT,
      payload: api.getProduct(params),
    })
  }
};

export { actions, actionCreaters };

