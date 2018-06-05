import apis from './api';

const actions = {
  CREATE_ORDER: 'CREATE_ORDER',
  DO_PAYMENT: 'DO_PAYMENT'
};

const actionCreators = {
  createOrder: (defaultAddrId) => (dispatch, getState) => {
    return dispatch({
      type: actions.CREATE_ORDER,
      payload: apis.createOrderApi(defaultAddrId),
    });
  },

  doPayment: (params) => (dispatch, getState) => {
    return dispatch({
      type: actions.DO_PAYMENT,
      payload: apis.doPaymentApi(params)
    });
  },
};

export { actions, actionCreators };

