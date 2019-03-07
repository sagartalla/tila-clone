import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
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
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.error, ui: { loading: false } }),
  },
  [actions.CRUD_COMPARE_STATE]: (state, action) => Object.assign({}, state, {
    data: {
      ...state.data,
      compareItemsCount: action.payload && action.payload.count,
      compareInfo: state.data.compareInfo.filter(item => item.product_id !== action.payload.id),
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
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.error, ui: { loading: false } })
    },
  },
  [actions.GET_PRODUCTS_TO_COMPARE]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        products: action.payload.data,
      },
      ui: { loading: false }
    }),
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.error, ui: { loading: false } })
    },
  }
}, initialState);

export default compareReducer;
