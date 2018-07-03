import api from './api';

const actions = {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_PREVIEW: 'GET_PREVIEW',
};

const actionCreators = {
  getProduct: (params) => {
    return ({
      type: actions.GET_PRODUCT,
      payload: api.getProduct(params),
    })
  },
  getPreview: (params) => {
    return ({
      type: actions.GET_PREVIEW,
      payload: api.getPreview(params),
    })
  }
};

export { actions, actionCreators };
