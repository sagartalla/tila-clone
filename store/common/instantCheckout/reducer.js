import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  error: {},
  selectedCOD: false,
};

const instantCheckoutReducer = typeToReducer({
  [actions.INSTANT_CHECKOUT]: {
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
  [actions.CLEAR_INSTANT_CHECKOUT] : (state,action) => {
    return {...state,data:{}}
  },
  [actions.INCLUDE_COD]: (state) => {
    return {...state, selectedCOD: true}
  },
  [actions.EXCLUDE_COD]: (state) => {
    return {...state, selectedCOD: false}
  },
}, initialState);

export default instantCheckoutReducer;
