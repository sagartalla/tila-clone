import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: [],
  warrantyData:[],
  error: {},
};

const orderReducer = typeToReducer({
  [actions.GET_ORDER_HISTORY]: {
    PENDING: (state) => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } });
    },
  },
  [actions.GET_WARRANTY_HISTORY]:{
    PENDING: (state) => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state,action) => {
      return Object.assign({}, state, { warrantyData: action.payload.data, ui: { loading: false }});
    },
    REJECTED: (state,action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } });
    }
  },
}, initialState);

export default orderReducer;
