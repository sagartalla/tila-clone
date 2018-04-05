import typeToReducer from 'type-to-reducer';
import {
    GET_SEARCH_RESULTS
} from './actions';

const initialState = {};

const searchReducer = typeToReducer({
  [GET_SEARCH_RESULTS]: {
    PENDING: state => state,
    FULFILLED: state => state,
    REJECTED: state => state,
  },
}, {});

export default searchReducer;