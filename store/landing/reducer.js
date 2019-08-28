import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
    isListingLoading: false,
  },
  data: {},
  listings: {},
  error: {},
  items: {
    content: [],
  },
};
const productReducer = typeToReducer({
  [actions.GET_PAGE]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: action.payload.data, ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message, ui: { loading: false },
    }),
  },
  [actions.GET_LISTINGS_DETAILS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true, isListingLoading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      listings: {
        ...state.listings,
        [action.payload.index]: action.payload.res.data,
      },
      ui: {
        loading: false,
        isListingLoading: false,
      },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false, isListingLoading: false },
      listings: {
        ...state.listings,
        [action.payload.index]: [],
      },
    }),
  },
  [actions.GET_ALL_ZONE_ITEMS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      items: action.payload.data, ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message, ui: { loading: false },
    }),
  },
}, initialState);

export default productReducer;
