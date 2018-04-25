import typeToReducer from 'type-to-reducer';
import { actions } from './actions';
import { actionCreaters } from './index';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    searchDetails: {},
    paginationDetails: {},
    productResponse: {
      products:[]
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
  [actions.GET_SEARCH_RESULTS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } })
    },
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
}, initialState);

export default searchReducer;