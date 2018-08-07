import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
    showFilters: false,
  },
  data: {
    searchDetails: {},
    paginationDetails: {},
    productResponse: {
      products: []
    }
  },
  error: {},
  autoSuggestion:[]
};
const searchReducer = typeToReducer({
  [actions.GET_MORE_RESULTS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state, action) => {
      let { productResponse } = action.payload.data;
      productResponse = {
        ...productResponse,
        products: state.data.productResponse.products.concat(productResponse.products)
      }
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
          productResponse,
        },
        ui: {
          loading: false
        }
      }
      return newState;
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.GET_SEARCH_RESULTS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data
        },
        ui: { loading: false } })
    },
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
  [actions.SEARCHBAR_FITLERS]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        showFilters: action.payload.show,
      }
    }
  },
  [actions.AUTO_SUGGESTIONS]: (state,action) => {
    return {
      ...state,
      autoSuggestion:action.payload
    }
  }
}, initialState);

export default searchReducer;
