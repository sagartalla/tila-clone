import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  useractive: true,
  error: '',
};

const personalDetailsReducer = typeToReducer({
  [actions.GET_USER_PROFILE_INFO]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        ...action.payload,
      },
      ui: { loading: false },
    }),
    REJECTED: (state, action) =>
      Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
  [actions.CHANGE_PASSWORD]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      const passResetStatus = { passResetStatus: action.payload.data };
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...passResetStatus,
        },
        ui: {
          loading: true,
        },
      };
      return newState;
    },
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response.data.message,
      ui: { loading: false },
    }),
  },
  [actions.EDIT_PERSONAL_INFO]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        ui: {
          loading: true,
        },
      };
      return newState;
    },
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response.data.message,
      ui: { loading: false },
    }),
  },
  [actions.RESET_PASSWORD_INFO_STORE]: (state) => {
    const error = '';
    const passResetStatus = { passResetStatus: {} };
    const newState = {
      ...state,
      error,
      data: {
        ...state.data,
        ...passResetStatus,
      },
      ui: {
        loading: true,
      },
    };
    return newState;
  },
  [actions.DEACTIVATE_USER_PROFILE]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: state => Object.assign({}, state, {
      ui: { loading: false },
      useractive: false,
    }),
    REJECTED: state => Object.assign({}, state, { ui: { loading: false } }),
  },
}, initialState);

export default personalDetailsReducer;
