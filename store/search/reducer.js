import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
    showFilters: false,
  },
  data: {
    searchDetails: {
      facetFilters: {}
    },
    paginationDetails: {},
    productResponse: {
      products: []
    }
  },
  error: {},
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
  // [actions.FETCH_IMAGESEARCHDATA]:{
  //   PENDING: state => Object.assign({},state,)
  // },
  [actions.GET_SEARCH_RESULTS]: {
    PENDING: state => Object.assign({}, state, {
      ...state,
      data: {
        ...state.data,
        spellCheckResponse: null,
      }
    }, { ui: { loading: true } }),
    FULFILLED: (state, action) => {      
      return Object.assign({}, state, {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
          suggestions: null
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
  [actions.REMOVE_FILTERS]: (state, action) => {
    const params = action.payload;
    const ff = state.data.searchDetails.facetFilters;
    const fArray = [...ff[params.parentKey]];
    fArray.splice(fArray.indexOf(action.key), 1);
    return {
      ...state,
      data: {
        ...state.data,
        searchDetails: {
          ...state.data.searchDetails,
          facetFilters: {
            ...state.data.searchDetails.facetFilters,
            [params.parentKey]: fArray,
          }
        }
      }
    };
  },
  [actions.FETCH_SUGGESTIONS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        ...state,
        data: {
          ...state.data,
          suggestions: action.payload.data
        },
        ui: { loading: false } })
    },
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  }
}, initialState);

export default searchReducer;
