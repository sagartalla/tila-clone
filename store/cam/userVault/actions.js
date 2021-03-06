import apis from './api';

const actions = {
  GET_CARD_RESULTS: 'GET_CARD_RESULTS',
  ADD_CARD_DETAILS: 'ADD_CARD_DETAILS',
  MAKE_CARD_DEFAULT: 'MAKE_CARD_DEFAULT',
  DELETE_CARD: 'DELETE_CARD',
  GET_TRANSACTIONS: 'GET_TRANSACTIONS',
  GET_CHECKOUT_OPTIONS: 'GET_CHECKOUT_OPTIONS',
  SELECTED_SAVED_CARD: 'SELECTED_SAVED_CARD',
};

const actionCreators = {
  getCardResults: () => {
    return {
      type: actions.GET_CARD_RESULTS,
      payload: apis.getCardResultsApi(),
    };
  },
  getCheckoutOptions: (params) => {
    return {
      type:actions.GET_CHECKOUT_OPTIONS,
      payload:apis.getCheckoutOptionsApi(params),
    }
  },
  addCard: (params) => {
    return {
      type: actions.ADD_CARD_DETAILS,
      payload: apis.addCardDetailsApi(params),
    };
  },
  makeCardDefault: (card_token) => {
    return {
      type: actions.MAKE_CARD_DEFAULT,
      payload: apis.makeCardDefaultApi(card_token),
    };
  },
  selectedSavedCard: (card_token) => {
    return {
      type: actions.SELECTED_SAVED_CARD,
      payload:card_token,
     }
  },
  deleteCard: (card_token) => {
    return {
      type: actions.DELETE_CARD,
      payload: apis.deleteCardApi(card_token),
    };
  },
  getWalletTransactions: () => {
    return {
      type: actions.GET_TRANSACTIONS,
      payload: apis.getWalletTransactions(),
    }
  }
};

export { actions, actionCreators };
