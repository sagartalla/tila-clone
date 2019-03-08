import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  reviews:[],
  reviewResponse:{},
  error: {},
};
const productReducer = typeToReducer({
  [actions.GET_PRODUCT]: {
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
}, initialState);

export default productReducer;
