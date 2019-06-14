import typeToReducer from 'type-to-reducer';
import Cookies from 'universal-cookie';
import { actions } from './actions';

const cookies = new Cookies();

const pageFlows = {
  existing_user_login: {
    password: {
      activePage: 'password',
      nextPage: '',
    },
  },
  new_user_register: {
    password_new: {
      activePage: 'password_new',
      nextPage: 'verify_email',
    },
    verify_email: {
      activePage: 'verify_email',
      nextPage: 'personal_details',
    },
    personal_details: {
      activePage: 'personal_details',
      nextPage: 'thank_you',
    },
    thank_you: {
      activePage: 'thank_you',
      nextPage: null,
    },
  },
  forgot_password: {
    security_page: {
      activePage: 'security_page',
      nextPage: 'reset_type',
    },
    reset_type: {
      activePage: 'reset_type',
      nextPage: 'success_screen',
    },
    success_screen: {
      activePage: 'success_screen',
      nextPage: '',
    },
  },
  forgot_password_reset: {
    reset_screen: {
      activePage: 'reset_screen',
      nextPage: 'thank_you',
    },
    thank_you: {
      activePage: 'thank_you',
      nextPage: null,
    },
  },
};

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
    userInfoData: {
      email_verified: 'NV',
    },
    domainCountries: [],
    showLoginScreen: false,
  },
  error: '',
  v2: {
    data: {},
    active: {
      activePage: '',
    },
    currentFlow: '',
  },
};

const authReducer = typeToReducer({
  // new reducers actions for Registration flow
  [actions.V2_USER_LOGIN]: {
    PENDING: state => state,
    FULFILLED: (state, action) => {
      const { data } = action.payload;
      const { v2 } = state;
      if (data.exist && data.last_social_login_used && data.last_social_login_used.length === 0) {
        v2.active = pageFlows.existing_user_login.password;
        v2.currentFlow = 'existing_user_login';
      } else if (!data.exist && data.last_social_login_used && data.last_social_login_used.length === 0) {
        v2.active = pageFlows.new_user_register.password_new;
        v2.currentFlow = 'new_user_register';
      }
      return Object.assign({}, state, {
        v2: {
          ...state.v2,
          ...v2,
          data,
        },
      });
    },
    REJECTED: state => state,
  },
  [actions.V2_NEW_USER_REGISTER]: state => Object.assign({}, state, {
    v2: {
      ...state.v2,
      active: pageFlows[state.v2.currentFlow][state.v2.active.nextPage],
    },
  }),
  // ///////////////////
  // ///////////////////
  // ///////////////////
  [actions.USER_LOGIN]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        ...state.ui,
        loginLoading: true,
      },
    }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        ...action.payload.data,
        isLoggedIn: true,
        showLoginScreen: false,
      },
      ui: {
        ...state.ui,
        loginLoading: false,
        showLogin: false,
      },
    }),
    REJECTED: (state, action) => {
      const messege = action.payload.response ? ({ 403: 'username/password did not match' }[action.payload.response.status]) : '';
      return Object.assign({}, state, {
        error: messege,
        data: {
          ...state.data,
          isLoggedIn: false,
        },
        ui: {
          ...state.ui,
          loginLoading: false,
        },
      });
    },
  },

  [actions.RESET_LOGIN_ERROR]: state => ({
    ...state,
    error: '',
  }),
  [actions.USER_REGISTER]: {
    PENDING: state => Object.assign(
      {}, state, {
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
      isLoggedIn: action.payload.isLoggedIn,
      userCreds: action.payload.userCreds,
      instagramCode: action.payload.instagramCode,
    },
    ui: {
      ...state.ui,
      // showLogin:!action.payload.isVerified
    },
  }),
  [actions.SET_COUNTRY]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      country: action.payload,
    },
  }),
  [actions.SET_CITY]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, {
      ui: {
        ...state.ui,
        loading: true,
      },
    }),
    FULFILLED: (state, action) => {
      const { city, country, displayCity } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          geoShippingDetails: {
            ...state.data.geoShippingDetails,
            city,
            country,
            displayCity,
          },
        },
      };
    },
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
  },
  [actions.REMOVE_CITY]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, {
      ui: {
        ...state.ui,
        loading: true,
      },
    }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        geoShippingDetails: {
          city: '',
          country: '',
          displayCity: '',
        },
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
  [actions.DERIVE_CITY]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, {
      ui: {
        ...state.ui,
        loading: true,
      },
    }),
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
          },
        },
      };
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
      isLoggedIn: (cookies.get('isVerified') && (cookies.get('isVerified') !== 'false')),
    },
  }),
  // [actions.RESET_SHOW_LOGIN]: state => ({
  //   ...state,
  //   data: {
  //     ...state.data,
  //     isLoggedIn: (cookies.get('isVerified') && (cookies.get('isVerified') !== "false")),
  //   },
  //   ui: {
  //     ...state.ui,
  //     showLogin: false,
  //     showEmailVerificationScreen: false,
  //   },
  //   showLoginScreen: false,
  // }),

  [actions.RESET_SHOW_LOGIN]: (state) => {
    const { v2 } = state;
    v2.active = '';
    v2.currentFlow = '';
    return Object.assign({}, state, {
      v2: {
        ...state.v2,
        ...v2,
      },
      ...state,
      data: {
        ...state.data,
        isLoggedIn: (cookies.get('isVerified') && (cookies.get('isVerified') !== 'false')),
        showLoginScreen: false,
      },
      ui: {
        ...state.ui,
        showLogin: false,
      },
    });
  },
  [actions.SET_LANGUAGE]: {
    PENDING: state => Object.assign({}, state, {
      error: '',
    }, {
      ui: {
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
        userInfoData: {
          ...state.data.userInfoData,
          email_verified: 'V',
        },
      },
      ui: {
        ...state.ui, loading: false, showEmailVerificationScreen: false, showLogin: false,
      },
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
        showEmailVerificationScreen: !!(action.payload && action.payload.data.email_verified === 'NV'),
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

  [actions.RESET_PASSWORD]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      const { v2, data } = state;
      if (action && action.payload.status === 200) {
        v2.active = pageFlows.forgot_password_reset.thank_you;
        v2.currentFlow = 'forgot_password_reset';
        data.showLoginScreen = true;
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
        },
        ui: { loading: false },
        v2: {
          ...state.v2,
          ...v2,
        },
      });
    },
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.data,
      ui: { loading: false },
    }),
  },

  [actions.FORGOT_PASSWORD]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        loading: true,
      },
      data: {
        ...state.data,
      },
    }),
    FULFILLED: (state, action) => {
      const { v2 } = state;
      if (action && action.payload) {
        v2.active = pageFlows.forgot_password.success_screen;
        v2.currentFlow = 'forgot_password';
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          showEmailSuccess: true,
        },
        ui: { loading: false },
        v2: {
          ...state.v2,
          ...v2,
        },
      });
    },
    REJECTED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
      },
      error: action.payload.data,
      ui: { loading: false },
      showLoginScreen: false,
    }),
  },

  [actions.SHOW_FORGOT_PASSWORD_SCREENS]: (state, action) => {
    const { v2 } = state;
    if (action && action.payload) {
      v2.active = pageFlows.forgot_password[action.payload];
      v2.currentFlow = 'forgot_password';
    }
    return Object.assign({}, state, {
      v2: {
        ...state.v2,
        ...v2,
      },
      ui: {
        ...state.ui,
        loading: false,
      },
    });
  },

  [actions.SHOW_LOGIN_SCREEN]: (state) => {
    const { v2 } = state;
    v2.active = '';
    v2.currentFlow = '';
    return Object.assign({}, state, {
      v2: {
        ...state.v2,
        ...v2,
      },
      ...state,
      data: {
        ...state.data,
        showLoginScreen: true,
      },
      ui: {
        ...state.ui,
        loading: false,
      },
    });
  },

  [actions.SHOW_USER_INFO]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        loading: true,
      },
      data: {
        ...state.data,
      },
    }),
    FULFILLED: (state, action) => {
      // const { v2 } = state;
      // if (action && action.payload) {
      //   v2.active = pageFlows.forgot_password.success_screen;
      //   v2.currentFlow = 'forgot_password';
      // }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          showLoginScreen: true,
          userData: action.payload.data,
        },
        ui: { loading: false },
        // v2: {
        //   ...state.v2,
        //   ...v2,
        // },
      });
    },
    REJECTED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
      },
      error: action.payload.data,
      ui: { loading: false },
    }),
  },
}, initialState);

export default authReducer;
