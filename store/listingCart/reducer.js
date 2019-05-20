import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    addToCart: {}
  },
  error: '',
};

const listingCartReducer = typeToReducer({
  [actions.LISTING_GET_CART_DETAILS]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      // console.log(state, actions)
      return Object.assign({}, state, { data: action.payload.data, ui: { loaded: true } });
    },
    REJECTED: (state, action) => {

      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.LISTING_ADD_TO_CART]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
        ui: { loading: false, loader: true }
      });
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
  [actions.LISTING_REMOVE_CART_ITEM]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false, loader: false, hideLoader: true } });
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
  [actions.LISTING_CART_ITEM_COUNT]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
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
}, initialState);

export default listingCartReducer;
