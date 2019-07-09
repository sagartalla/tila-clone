import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  listings: [],
  error: {},
};
const productReducer = typeToReducer({
  [actions.GET_PAGE]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: true } });
    },
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
  [actions.GET_LISTINGS_DETAILS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      listings: action.payload.data,
    }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
}, initialState);

export default productReducer;
