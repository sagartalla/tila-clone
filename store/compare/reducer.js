import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    compareItems: {
      products: [],
    },
    compareItemsCount: 0,
    compareInfo: [],
    brands: {},
    products: {},
  },
  error: null,
};

const compareReducer = typeToReducer({
  [actions.CRUD_COMPARE]: (state, action) => Object.assign({}, state, {
    data: {
      ...state.data,
      compareItemsCount: action.payload && action.payload.count,
      compareItems: action.payload && action.payload.compareItems,
    },
  }),
  [actions.GET_BRANDS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        brands: action.payload.data,
      },
      ui: { loading: false },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.error,
      ui: { loading: false },
    }),
  },
  [actions.REMOVE_COMPARE_ITEM]: (state, action) => Object.assign({}, state, {
    data: {
      ...state.data,
      compareItemsCount: action.payload && action.payload.count,
      compareInfo: state.data.compareInfo.filter(item => item.product_id !== action.payload.id),
      compareItems: action.payload && action.payload.compareItems,
      products: {},
    },
  }),
  [actions.GET_COMPARE_ITEM_DATA]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        compareInfo: action.payload.data,
        products: {},
      },
      ui: { loading: false },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.error,
      ui: { loading: false },
    }),
  },
  [actions.GET_PRODUCTS_TO_COMPARE]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        products: action.payload.data,
      },
      ui: { loading: false },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.error,
      ui: { loading: false },
    }),
  },
}, initialState);

export default compareReducer;
