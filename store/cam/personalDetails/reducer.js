import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  error: "",
};

const personalDetailsReducer = typeToReducer({
  [actions.GET_USER_PROFILE_INFO]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload,
        ui: { loading: false }
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.CHANGE_PASSWORD]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      const passResetStatus = {'passResetStatus': action.payload.data}
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...passResetStatus,
        },
        ui: {
          loading: true
        }
      }
      return newState;
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { 
        error: action.payload.response.data.message, 
        data: {
        ...state.data
        },
        ui: { loading: false } })
    }
  }

}, initialState);

export default personalDetailsReducer;