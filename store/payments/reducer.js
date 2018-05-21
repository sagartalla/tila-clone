import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {};

const paymentsReducer = typeToReducer({
  [actions.CREATE_ORDER]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload, ui: { loading: true } });
    },
  },
  [actions.DO_PAYMENT]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      console.log(state, action);
      //return Object.assign({}, state, { data: action.payload, ui: { loading: true } });
    },
  },

}, initialState);

export default paymentsReducer;