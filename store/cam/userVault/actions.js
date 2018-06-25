import apis from './api';

const actions = {
  GET_CARD_RESULTS: 'GET_CARD_RESULTS',
  ADD_CARD_DETAILS: 'ADD_CARD_DETAILS',
  MAKE_CARD_DEFAULT: 'MAKE_CARD_DEFAULT',
  DELETE_CARD: 'DELETE_CARD',
};

const actionCreators = {
  getCardResults: () => (dispatch, getState) => {
    return {
      type: actions.GET_CARD_RESULTS,
      payload: apis.getCardResultsApi(),
    };
  },
  addCard: (params) => (dispatch, getState) => {
    return {
      type: actions.ADD_CARD_DETAILS,
      payload: apis.addCardDetailsApi(params),
    };
  },
  makeCardDefault: (card_token) => (dispatch, getState) => {
    return {
      type: actions.MAKE_CARD_DEFAULT,
      payload: apis.makeCardDefaultApi(card_token),
    };
  },
  deleteCard: (card_token) => (dispatch, getState) => {
    return {
      type: actions.DELETE_CARD,
      payload: apis.deleteCardApi(card_token),
    };
  }
};

export { actions, actionCreators };

