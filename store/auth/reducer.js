import typeToReducer from 'type-to-reducer';
import Cookies from 'universal-cookie';
import pageFlows from '../../components/Login/pageFlows';
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
    userInfoData: {
      email_verified: 'NV',
    },
    domainCountries: [],
    showLoginScreen: false,
    showResetScreen: true,
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
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true } }),
    FULFILLED: (state, action) => {
      const { data } = action.payload;
      const { v2 } = state;
      if (data.exist && data.last_social_login_used && data.last_social_login_used.length === 0) {
        v2.active = pageFlows.existing_user_login.password;
        v2.currentFlow = 'existing_user_login';
      } else if (!data.exist && data.last_social_login_used && data.last_social_login_used.length === 0) {
        v2.active = pageFlows.new_user_register.password_new;
        v2.currentFlow = 'new_user_register';
      } else if (data.exist && data.last_social_login_used && data.last_social_login_used.length >= 1) {
        v2.active = pageFlows.existing_social_user.existing_social_login;
        v2.currentFlow = 'existing_social_user';
      }
      return Object.assign({}, state, {
        v2: {
          ...state.v2,
          ...v2,
          data,
        },
        ui: {
          ...state.ui,
          loading: false,
        },
      });
    },
    REJECTED: state => Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
  },
  [actions.V2_SHOW_NEXT_PAGE]: state => Object.assign({}, state, {
    v2: {
      ...state.v2,
      active: pageFlows[state.v2.currentFlow][state.v2.active.nextPage],
    },
  }),
  [actions.CHANGE_CURRENT_FLOW]: (state, action) => Object.assign({}, state, {
    v2: {
      ...state.v2,
      active: pageFlows[action.payload.currentFlow][action.payload.nextPage],
      currentFlow: action.payload.currentFlow,
    },
  }),
  // [actions.V2_SHOW_NEXT_PAGE]: (state) => {
  //   const { v2 } = state;
  //   return Object.assign({}, state, {
  //     ...state,
  //     v2: {
  //       ...state.v2,
  //       active: pageFlows[state.v2.currentFlow][state.v2.active.nextPage]
  //     },
  //   });
  // },
  // ///////////////////
  // ///////////////////
  // ///////////////////

  [actions.GET_USER_INFO]: {
    PENDING: state => Object.assign({}, state, {
      ui: { ...state.ui, loading: true, showEmailVerificationScreen: false },
    }),
    FULFILLED: (state, action) => {
      let active;
      let { currentFlow } = state.v2;
      if (action.payload.data.email_verified === 'NV') {
        active = pageFlows.new_user_register.verify_email;
        currentFlow = 'new_user_register';
      } else {
        active = {
          activePage: '',
        };
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          userInfoData: action.payload && action.payload.data,
          showLoginScreen: !!(action.payload && action.payload.data.email_verified === 'NV'),
        },
        ui: {
          ...state.ui,
          loading: false,
          showEmailVerificationScreen: !!(action.payload && action.payload.data.email_verified === 'NV'),
        },
        v2: {
          ...state.v2,
          active,
          currentFlow,
        },
      });
    },
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false, showEmailVerificationScreen: false } }),
  },
  [actions.USER_LOGIN]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        ...state.ui,
        loginLoading: true,
        loading: true,
      },
    }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        ...action.payload.data,
        isLoggedIn: true,
      },
      ui: {
        ...state.ui,
        loginLoading: false,
        showLogin: false,
        loading: false,
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
          loading: false,
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
        ui: {
          ...state.ui,
          loading: false,
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
  // [actions.SHOW_LOGIN]: (state, action) => ({
  //   ...state,
  //   ui: {
  //     ...state.ui,
  //     showLogin: true,
  //     showEmailVerificationScreen: false,
  //   },
  //   data: {
  //     ...state.data,
  //     isLoggedIn: (cookies.get('isVerified') && (cookies.get('isVerified') !== 'false')),
  //   },
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
        showResetScreen: false,
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
      ui: { ...state.ui, loading: false, showEmailVerificationScreen: false, showLogin: false },
      v2: {
        ...state.v2,
        active: pageFlows[state.v2.currentFlow][state.v2.active.nextPage],
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
      const { data } = state;
      if ((action && action.payload && action.payload.data && action.payload.data.Response && action.payload.data.Response === 200) || (action && action.payload && action.payload.data && action.payload.data.Response && action.payload.data.Response === 'SUCCESS')) {
        data.showLoginScreen = true;
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          showResetScreen: false,
        },
        ui: { loading: false },
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
      return Object.assign({}, state, {
        data: {
          ...state.data,
          showEmailSuccess: true,
        },
        ui: { loading: false },
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

  [actions.ClOSE_THANKYOU_SCREEN]: (state) => {
    return Object.assign({}, state, {
      ...state,
      data: {
        ...state.data,
        showLoginScreen: false,
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
      return Object.assign({}, state, {
        data: {
          ...state.data,
          showLoginScreen: true,
          userData: action.payload.data,
        },
        ui: { loading: false },
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
  [actions.GET_MOBILE_OTP]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        loading: true,
      },
      data: {
        ...state.data,
      },
    }),
    FULFILLED: (state, action) => {

      return Object.assign({}, state, {
        data: {
          ...state.data,
          showOtpSuccess: true,
          showEmailSuccess: false,
        },
        ui: { loading: false },
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
  [actions.VERIFY_RESET_OTP]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        loading: true,
      },
      data: {
        ...state.data,
      },
    }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          ...state.data,
          resetToken: action.payload && action.payload.data && action.payload.data.token && action.payload.data.token,
        },
        ui: { loading: false },
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
