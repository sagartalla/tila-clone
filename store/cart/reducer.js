import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
      loading: false,
  },
  data: {},
  error: {},
};

const cartReducer = typeToReducer({
    [actions.GET_CART_DETAILS]: {
        PENDING: state => {
          return Object.assign({}, state, { ui: { loading: true } });
        },
        FULFILLED: (state, action) => {
          // console.log(state, actions)
          return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
        },
        REJECTED: (state, action) => {

          return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
        },
    },
    [actions.ADD_TO_CART]: {
        PENDING: state => {
          return Object.assign({}, state, { ui: { loading: true } });
        },
        FULFILLED: (state, action) => {
          return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
        },
        REJECTED: (state, action) => {
          return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
        },
    }
}, initialState);

export default cartReducer;