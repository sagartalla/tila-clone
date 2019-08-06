import apis from './api';

const actions = {
  GET_CARD_RESULTS: 'GET_CARD_RESULTS',
  ADD_CARD_DETAILS: 'ADD_CARD_DETAILS',
  MAKE_CARD_DEFAULT: 'MAKE_CARD_DEFAULT',
  DELETE_CARD: 'DELETE_CARD',
  GET_TRANSACTIONS: 'GET_TRANSACTIONS',
};

const actionCreators = {
  getCardResults: () => {
    return {
      type: actions.GET_CARD_RESULTS,
      payload: apis.getCardResultsApi(),
    };
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

