import typeToReducer from 'type-to-reducer';
import Cookies from 'universal-cookie';
import { actions } from './actions';

const cookies = new Cookies();

const initialState = {
  ui: {
    loading: false,
    loginLoading: false,
    showLogin: false,
    showEmailVerificationScreen: false,
  },
  data: {
    isLoggedIn: false,
    userCreds: {},
    geoShippingDetails: {},
    autoCompleteCity: [],
    userInfoData: {},
    domainCountries: [],
  },
  error: '',
};

const authReducer = typeToReducer({
  [actions.USER_LOGIN]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        ...state.ui,
        loginLoading: true,
      },
    }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload.data,
          isLoggedIn: true,
        },
        ui: {
          ...state.ui,
          loginLoading: false,
          showLogin: false,
        },
      });
    },
    REJECTED: (state, action) => {
      const messege = action.payload.response ? ({403: 'username/password did not match'}[action.payload.response.status]) : '';
      return Object.assign({}, state, {
        error: messege,
        data: {
          ...state.data,
          isLoggedIn: false,
        },
        ui: {
          ...state.ui,
          loginLoading: false,
        }
      });
    },
  },

  [actions.RESET_LOGIN_ERROR]: state => ({
    ...state,
    error: '',
  }),
  [actions.USER_REGISTER]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    },
    {
      ui: {
        ...state.ui,
        loading: true,
      },
    },
    ),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        registrationDetails: action.payload.data,
      },
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
  },
  [actions.USER_LOGOUT]: state => ({
    ...state,
    data: {
      ...state.data,
      isLoggedIn: false,
    },
    ui: {
      showLogin: false,
    },
  }),
  [actions.USER_LOGIN_INFO]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      isLoggedIn: state.data.userInfoData.email_verified === 'NV' ? false : action.payload.isLoggedIn,
      userCreds: action.payload.userCreds,
      instagramCode: action.payload.instagramCode,
    },
    ui: {
      ...state.ui,
      showLogin: true,
    },
  }),
  [actions.SET_COUNTRY]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      country: action.payload,
    }
  }),
  [actions.SET_CITY]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, { ui: {
      ...state.ui,
      loading: true,
    } }),
    FULFILLED: (state, action) => {
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
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {  ...state.ui,
        loading: false }
    }),
  },
  [actions.REMOVE_CITY]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, { ui: {
      ...state.ui,
      loading: true,
    } }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        geoShippingDetails: {
          city: '',
          country: '',
          displayCity: '',
        }
      }
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {  ...state.ui,
        loading: false }
    }),
  },
  [actions.DERIVE_CITY]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, { ui: {
      ...state.ui,
      loading: true,
    } }),
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
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
  },
  [actions.SHOW_LOGIN]: (state, action) => ({
    ...state,
    ui: {
      ...state.ui,
      showLogin: true,
      showEmailVerificationScreen: false,
    },
    data: {
      ...state.data,
      isLoggedIn: state.data.userInfoData.email_verified === 'NV' ? false : (cookies.get('isVerified') && (cookies.get('isVerified') === "false" ? false : true)),
    },
  }),
  [actions.RESET_SHOW_LOGIN]: state => ({
    ...state,
    data: {
      ...state.data,
      isLoggedIn: state.data.userInfoData.email_verified === 'NV' ? false : (cookies.get('isVerified') && (cookies.get('isVerified') === "false" ? false : true)),
    },
    ui: {
      ...state.ui,
      showLogin: false,
      showEmailVerificationScreen: false,
    },
  }),
  [actions.SET_LANGUAGE]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, { ui: {
      ...state.ui,
      loading: true,
    },
    }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        language: action.payload,
      },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
  },
  [actions.VERIFY_EMAIL]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true, showEmailVerificationScreen: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        ...action.payload,
      },
      ui: { ...state.ui, loading: false, showEmailVerificationScreen: false, showLogin: false },
    }),
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false, showEmailVerificationScreen: true } }),
  },
  [actions.VERIFY_RESEND_EMAIL]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true, showEmailVerificationScreen: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        ...action.payload,
      },
      ui: { ...state.ui, loading: false, showEmailVerificationScreen: true },
    }),
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false, showEmailVerificationScreen: true } }),
  },

  [actions.GET_USER_INFO]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true, showEmailVerificationScreen: false } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        userInfoData: action.payload && action.payload.data,
      },
      ui: {
        ...state.ui,
        loading: false,
        showEmailVerificationScreen: action.payload && action.payload.data.email_verified === 'NV' ? true : false,
      },
    }),
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false, showEmailVerificationScreen: false } }),
  },
  [actions.GET_DOMAIN_COUNTRIES]: {
    PENDING: state => state,
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        domainCountries: action.payload && action.payload.data,
      },
    }),
    REJECTED: state => state,
  },
}, initialState);

export default authReducer;
