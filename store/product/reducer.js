import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  reviews:[],
  reviewResponse:{},
  variantsData: {},
  error: {},
};
const productReducer = typeToReducer({
  [actions.GET_PRODUCT]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
        variantsData: {
          selectedVariantId: Object.keys(action.payload.data[0].variant_preferred_listings || {})[0]
        },
        ui: { loading: true }
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.GET_PREVIEW]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.GET_REVIEW_RATINGS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state,action) => {
      return Object.assign({}, state, { reviews: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state,action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: {loading: false }} )
    }
  },
  [actions.SUBMIT_USER_REVIEW]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state,action) => {
      return Object.assign({}, state, { reviewResponse: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state,action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: {loading: false }} )
    }
  },
  [actions.SET_SELECTED_VARIANT]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state,action) => {
      return Object.assign({}, state, { variantsData: action.payload, ui: { loading: false } });
    },
    REJECTED: (state,action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: {loading: false }});
    }
  },
  [actions.SET_SELECTED_PRODUCT_DATA]: (state, action) => {
    return state;
  }
}, initialState);

export default productReducer;
