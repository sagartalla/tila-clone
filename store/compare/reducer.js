import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    compareItemsCount: 0,
    compareInfo: [],
  },
  error: null,
};

const compareReducer = typeToReducer({
  [actions.CRUD_COMPARE]: (state, action) => Object.assign({}, state, {
    data: {
      ...state.data,
      compareItemsCount: action.payload && action.payload.count,
    },
  }),
  [actions.GET_COMPARE_ITEM_DATA]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
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
