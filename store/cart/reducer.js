import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    addToCart: {},
    items: []
  },
  error: '',
};

const cartReducer = typeToReducer({
  [actions.GET_CART_DETAILS]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      // console.log(state, actions)
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload.data
        }, ui: { loaded: true } });
    },
    REJECTED: (state, action) => {

      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.ADD_TO_CART]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: {
        ...state.data,
        addToCart: action.payload.data
      },
      ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: {
          loading: false
        }
      });
    },
  },
  [actions.REMOVE_CART_ITEM]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload.data
        },
        ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: {
          loading: false
        }
      });
    },
  },
  [actions.CART_ITEM_COUNT]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: {...state.data, ...action.payload.data}, ui: { loading: false, loader: 'hide' } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        data: state.data,
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: {
          loading: false
        }
      });
    },
  },
  [actions.ADD_REMOVE_GIFT]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: {...state.data, ...action.payload.data}, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        data: state.data,
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: {
          loading: false
        }
      });
    },
  },
  [actions.RESET_ADD_TO_CART]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      addToCart: {},
    }
  })
}, initialState);

export default cartReducer;
