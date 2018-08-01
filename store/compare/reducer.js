import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    compareItemsCount: 0,
    compareInfo: []
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
          ...state.data,
          compareItemsCount: action.payload.count
        },
        ui: { loading: false }
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.error, ui: { loading: false } })
    },
  },
  [actions.GET_COMPARE_ITEM_DATA]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        compareInfo: action.payload.data,
      },
      ui: { loading: false }
    }),
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.error, ui: { loading: false } })
    }
  }
}, initialState);

export default compareReducer;
