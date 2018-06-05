import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {};

const wishlistReducer = typeToReducer({
  [actions.GET_WISHLIST]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
    },
  },
}, initialState);

export default wishlistReducer;