import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
  },
  error: '',
};

const paymentsReducer = typeToReducer({
  [actions.CREATE_ORDER]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        loading: true,
      },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: action.payload,
      ui: { loading: true },
    }),
  },
  [actions.EMPTY_PAYMENT_PAYLOAD]: (state, action) => Object.assign({}, state, {
    data: action.payload,
    ui: { loading: true },
  }),
  [actions.DO_PAYMENT]: {
    PENDING: state => Object.assign({}, state, {
      ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: (state, action) => {
      const payRes = { payRes: action.payload.data };
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...payRes,
        },
        ui: {
          loading: true,
        },
      };
      return newState;
    },
  },
  [actions.SAVE_CARD]: {
    PENDING: state => Object.assign({}, state, {
      ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: state => Object.assign({}, state, {
      data: { ...state.data },
      ui: { loading: true },
    }),
  },
}, initialState);

export default paymentsReducer;