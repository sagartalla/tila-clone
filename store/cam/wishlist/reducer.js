import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: [],
  products: [],
  error: '',
  paginationData: {},
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
      return Object.assign({}, state, { paginationData: action.payload.data, data: action.payload.data.content,  ui: { loading: false } });
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
      return Object.assign({}, state, { paginationData: action.payload.data,removeToWishlist: action.payload.data.content, data: [...action.payload.data.content], ui: { loading: false } });
    },
  },
  [actions.NOTIFY_ME]: {
    PENDING: (state) => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state) => {
      return Object.assign({}, state, { ui: { loading: false } });
    },
    FULFILLED: (state) => {
      return Object.assign({}, state, { ui: { loading: false } });
    },
  },
  [actions.WISHLIST_PRODUCTS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: state => Object.assign({}, state, { ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      ui: { loading: false },
      products: action.payload && action.payload.data,
    }),
  },
}, initialState);

export default wishlistReducer;
