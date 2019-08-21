import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  selectedCard:''
};

const vaultReducer = typeToReducer({
  [actions.GET_CARD_RESULTS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        savedCards: _.sortBy(action.payload.data.saved_cards, o => !o.default),
        tilaCredit: action.payload.data.balance_amount,
      },
      ui: { loading: false },
    }),
  },
  [actions.ADD_CARD_DETAILS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, { data: action.payload.data, ui: { loading: true } }),
  },
  [actions.MAKE_CARD_DEFAULT]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        savedCards: _.sortBy(action.payload.data.saved_cards, o => !o.default),
        tilaCredit: action.payload.data.balance_amount,
      },
      ui: { loading: false },
    }),
  },
  [actions.DELETE_CARD]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        savedCards: _.sortBy(action.payload.data.saved_cards, o => !o.default),
        tilaCredit: action.payload.data.balance_amount,
      },
      ui: { loading: false },
    }),
  },
  [actions.GET_TRANSACTIONS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: Object.assign({}, state.data, {
        ...action.payload,
      }),
      ui: { loading: false },
    }),
  },
  [actions.GET_CHECKOUT_OPTIONS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false }}),
    FULFILLED: (state,action) => Object.assign({}, state, {
      data:{
        cardDetails: action.payload.data,
      },
      ui: { loading: false },
    }),
  },
  [actions.SELECTED_SAVED_CARD]: (state,action) => {
    return {...state, selectedCard:action.payload }
  }
}, initialState);

export default vaultReducer;
