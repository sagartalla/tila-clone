import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    compareItemsCount: 0
  },
  error: null,
};

const compareReducer = typeToReducer({
  [actions.ADD_TO_COMPARE]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          compareItemsCount: action.payload.count
        },
        ui: { loading: false }
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.error, ui: { loading: false } })
    },
  }
}, initialState);

export default compareReducer;
