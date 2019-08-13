import apis from './api';

const actions = {
  CREATE_ORDER: 'CREATE_ORDER',
  DO_PAYMENT: 'DO_PAYMENT',
  SAVE_CARD: 'SAVE_CARD',
  EMPTY_PAYMENT_PAYLOAD: 'EMPTY_PAYMENT_PAYLOAD',
  MAKE_PROCESS_REQUEST: 'MAKE_PROCESS_REQUEST',
  GET_REDIRECT: 'GET_REDIRECT',
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
  },
  makeProcessRequest: (params) => (dispatch, getState) => {
    const state = getState();
    const { paymentsReducer } = state;
    params.transaction_id = paymentsReducer.data.data.transaction_id;
    return dispatch({
      type: actions.MAKE_PROCESS_REQUEST,
      payload: apis.makeProcessRequest(params)
    })
  },
  getRedirect: (params) => {
    return {
      type: actions.GET_REDIRECT,
      payload: apis.getRedirectApi(params)
    }
  },
  refreshTransaction: (useWallet) => (dispatch, getState) => {
    const state = getState();
    const { paymentsReducer } = state;
    return {
      type: actions.CREATE_ORDER,
      payload: apis.refreshTransactionApi(paymentsReducer.data.transactionUrl, useWallet),
    }
  }
};

export { actions, actionCreators };
