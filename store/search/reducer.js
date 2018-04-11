import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  error: {},
};

const searchReducer = typeToReducer({
  [actions.GET_SEARCH_RESULTS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true }}),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } })
    },
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
}, initialState);

export default searchReducer;