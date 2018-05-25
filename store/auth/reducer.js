import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    isLoggedIn: false,
    userCreds: {},
  },
  error: '',
};

const productReducer = typeToReducer({
  [actions.USER_LOGIN]: {
    PENDING: state => {
      return Object.assign({}, state, {
        error: '',
      }, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response.data.message, 
        data: { 
          ...state.data,
          isLoggedIn: false
        },
        ui: { loading: false }
      });
    },
  },
  [actions.USER_LOGOUT]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        isLoggedIn: false,
      }
    }
  },
  [actions.USER_LOGIN_INFO]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        isLoggedIn: action.payload.isLoggedIn,
        userCreds: action.payload.userCreds,
      }
    }
  }
  
}, initialState);

export default productReducer;