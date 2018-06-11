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
  },
  [actions.EDIT_PERSONAL_INFO]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
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
  },
  [actions.RESET_PASSWORD_INFO_STORE]: (state, action) => {
    const error=""
    const passResetStatus = {'passResetStatus': {}} 
   const newState={
    ...state,
    error,
    data: {
      ...state.data,
      ...passResetStatus,
    },
    ui: {
      loading: true
    }
   }
   return newState;
  }

}, initialState);

export default personalDetailsReducer;