import apis from './api';

const actions = {
  CREATE_ORDER: 'CREATE_ORDER',
  DO_PAYMENT: 'DO_PAYMENT',
  SAVE_CARD: 'SAVE_CARD',
  EMPTY_PAYMENT_PAYLOAD: 'EMPTY_PAYMENT_PAYLOAD',
};

const actionCreators = {
  createOrder: (defaultAddrId) => (dispatch, getState) => {
    return dispatch({
      type: actions.CREATE_ORDER,
      payload: apis.createOrderApi(defaultAddrId),
    });
  },

  emptyPaymentPaylod: () => {
    return {
      type: actions.EMPTY_PAYMENT_PAYLOAD,
      payload: {}
    }
  },

  doPayment: (params) => (dispatch, getState) => {
    return dispatch({
      type: actions.DO_PAYMENT,
      payload: apis.doPaymentApi(params)
    });
  },

  saveCard: (params) => {
    return {
      type: actions.SAVE_CARD,
      payload: apis.saveCardApi(params),
    }
  }
};

export { actions, actionCreators };

