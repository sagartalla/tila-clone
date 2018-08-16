import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
    loginLoading: false,
    showLogin: false,
  },
  data: {
    isLoggedIn: false,
    userCreds: {},
    geoShippingDetails: {},
    autoCompleteCity: [],
  },
  error: '',
};

const authReducer = typeToReducer({
  [actions.USER_LOGIN]: {
    PENDING: state => {
      return Object.assign({}, state, {
        error: '',
      }, { ui: { loginLoading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload.data,
          showLogin: false,
        },
        ui: { loginLoading: false }
      });
    },
    REJECTED: (state, action) => {
      const messege = ({403: 'username/password did not match'}[action.payload.response.status]);
      return Object.assign({}, state, {
        error: messege,
        data: {
          ...state.data,
          isLoggedIn: false
        },
        ui: { loginLoading: false }
      });
    },
  },
  [actions.RESET_LOGIN_ERROR]: (state) => {
    return {
      ...state,
      error: '',
    }
  },
  [actions.USER_REGISTER]: {
    PENDING: state => {
      return Object.assign({}, state, {
        error: '',
      }, { ui: { loginLoading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          ...state.data,
          registrationDetails: action.payload.data
        },
        ui: { loginLoading: false }
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: { loginLoading: false }
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
  },
  [actions.SET_COUNTRY]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        country: action.payload
      }
    }
  },
  [actions.SET_CITY]: (state, action) => {
    const { city, country, displayCity } = action.payload
    return {
      ...state,
      data: {
        ...state.data,
        geoShippingDetails: {
          ...state.data.geoShippingDetails,
          city,
          country,
          displayCity,
        }
      }
    }
  },
  [actions.DERIVE_CITY]: {
    PENDING: state => {
      return Object.assign({}, state, {
        error: '',
      }, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      const { city, country, displayCity } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          geoShippingDetails: {
            city,
            country,
            displayCity,
          }
        }
      }
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: { loading: false }
      });
    },
  },
  [actions.RESET_AUTOCOMPLETE_CITY]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        autoCompleteCity: []
      }
    }
  },
  [actions.AUTOCOMPLETE_CITY]: {
    PENDING: state => {
      return Object.assign({}, state, {
        error: '',
      }, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          autoCompleteCity: action.payload,
        }
      }
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: { loading: false }
      });
    },
  },
  [actions.SHOW_LOGIN]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        showLogin: true,
      }
    }
  },
  [actions.RESET_SHOW_LOGIN]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        showLogin: false,
      }
    }
  },
  [actions.SET_LANGUAGE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        language: action.payload
      }
    }
  },
}, initialState);

export default authReducer;
