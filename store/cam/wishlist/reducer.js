import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
    notifyLoading: false,
  },
  data: [],
  products: [],
  recentlyViewed: [],
  error: '',
  paginationData: {},
};

const wishlistReducer = typeToReducer({
  [actions.GET_WISHLIST]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) =>
      Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      paginationData: action.payload.data,
      data: action.payload.data.content,
      ui: { loading: false },
    }),
  },
  [actions.ADD_TO_WISHLIST]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) =>
      Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) =>
      Object.assign({}, state, { addToWishlist: action.payload.data, ui: { loading: false } }),
  },
  [actions.DELETE_TO_WISHLIST]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) =>
      Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      paginationData: action.payload.data,
      removeToWishlist: action.payload.data.content,
      data: [...action.payload.data.content],
      ui: { loading: false },
    }),
  },
  [actions.NOTIFY_ME]: {
    PENDING: state => Object.assign({}, state, { ui: { notifyLoading: true } }),
    REJECTED: state => Object.assign({}, state, { ui: { notifyLoading: false } }),
    FULFILLED: state => Object.assign({}, state, { ui: { notifyLoading: false } }),
  },
  [actions.WISHLIST_PRODUCTS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: state => Object.assign({}, state, { ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      ui: { loading: false },
      products: action.payload && action.payload.data,
    }),
  },
  [actions.GET_RECENTLY_VIEWED]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    REJECTED: (state, action) =>
      Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      ui: { loading: false },
      recentlyViewed: action.payload && action.payload.data,
    }),
  },
}, initialState);

export default wishlistReducer;
