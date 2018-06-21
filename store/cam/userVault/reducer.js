import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {};

const vaultReducer = typeToReducer({
  [actions.GET_CARD_RESULTS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: _.sortBy(action.payload.data, (o) => { return !o.default; }), ui: { loading: true } });
    },
  },
  [actions.ADD_CARD_DETAILS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: true } });
    },
  },
  [actions.MAKE_CARD_DEFAULT]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: true } });
    },
  },
  [actions.DELETE_CARD]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: true } });
    },
  }
}, initialState);

export default vaultReducer;