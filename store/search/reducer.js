import typeToReducer from 'type-to-reducer';
import { GET_SEARCH_RESULTS } from './actions';

const initialState = {};

const searchReducer = typeToReducer({
  [GET_SEARCH_RESULTS]: {
    PENDING: state => Object.assign({}, state, initialState),
    FULFILLED: (state, action) => Object.assign({}, state, { data: action.payload.data }),
    REJECTED: (state, action) => Object.assign({}, state, { error: action.payload.message }),
  },
}, {});

export default searchReducer;