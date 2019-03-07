import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: [],
  error: '',
};

const wishlistReducer = typeToReducer({
  [actions.GET_WISHLIST]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
    },
  },
  [actions.ADD_TO_WISHLIST]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { addToWishlist: action.payload.data, ui: { loading: false } });
    },
  },
  [actions.DELETE_TO_WISHLIST]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { removeToWishlist: action.payload.data, data: [...action.payload.data], ui: { loading: false } });
    },
  },
  [actions.NOTIFY_ME]: {
    PENDING: state => state,
    FULFILLED: state => state,
    REJECTED: state => state,
  },
}, initialState);

export default wishlistReducer;
