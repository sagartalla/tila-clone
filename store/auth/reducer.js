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
    showCheckoutLogin: true,
    showEmailVerifySuccess: false,
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
    loginResponse: {},
    userInfo: {},
    showUserInfo: false,
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

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const authReducer = typeToReducer({
  // new reducers actions for Registration flow
  [actions.V2_USER_LOGIN]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true } }),
    FULFILLED: (state, action) => {
      const { data } = action.payload;
      const { v2 } = state;
      if (data.exist && data.password_exists) {
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
        data: {
          ...state.data,
          userInfo: action.payload.data,
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
  [actions.V2_PREVIOUS_PAGE]: state => Object.assign({}, state, {
    v2: {
      ...state.v2,
      active: '',
    },
  }),
  [actions.CHANGE_CURRENT_FLOW]: (state, action) => Object.assign({}, state, {
    v2: {
      ...state.v2,
      active: pageFlows[action.payload.currentFlow ? action.payload.currentFlow : state.v2.currentFlow][action.payload.nextPage],
      currentFlow: action.payload.currentFlow ? action.payload.currentFlow : state.v2.currentFlow,
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
      ui: {
        ...state.ui,
        loading: true,
      },
    }),
    FULFILLED: (state, action) => {
      let active;
      let { currentFlow } = state.v2;
      const { data } = state;
      if (action.payload.data.email_verified === 'NV') {
        active = currentFlow ? pageFlows[currentFlow]['verify_email'] : '';
      } else {
        active = {
          activePage: '',
        };
      }
      return Object.assign({}, state, {
        ui: {
          ...state.ui,
          loading: false,
          showCheckoutLogin: !!(action.payload && action.payload.data.email_verified === 'NV'),
        },
        data: {
          ...state.data,
          // isLoggedIn: (currentFlow === '' || currentFlow === 'existing_social_user') ? true : true,
          userInfoData: action.payload && action.payload.data,
        },
        v2: {
          ...state.v2,
          active,
          currentFlow,
        },
      });
    },
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
  },
  [actions.USER_LOGIN]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        ...state.ui,
        loginLoading: true,
        loading: true,
      },
    }),
    FULFILLED: (state, action) => {
      let active;
      let { currentFlow } = state.v2;
      if (action && action.payload && action.payload.data && action.payload.data.data && action.payload.data.data.social_token && action.payload.data.data.social_token) {
        active = pageFlows.not_accessable_social_user.social_login;
        currentFlow = 'not_accessable_social_user';
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload.data,
          isLoggedIn: true,
          loginResponse: action.payload.data,
          showCheckoutLogin: !!(action.payload && action.payload.data.email_verified === 'NV'),
          showLoginScreen: currentFlow === 'existing_user_login' ?
            false : currentFlow === 'not_accessable_social_user' ? true:
            window.location.pathname.indexOf('/payment') > -1 ? false :
            currentFlow === 'new_user_register' ? true : !!(action.payload && action.payload.data.email_verified === 'NV'),  
          // Dont show verify for existing_user_login after login, show verify for new_user_register after signup
        },
        ui: {
          ...state.ui,
          loginLoading: false,
          showLogin: false,
          loading: false,
        // showCheckoutLogin: true,
        },
        v2: {
          ...state.v2,
          active,
          currentFlow,
        },
      });
    },
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
  [actions.USER_LOGOUT]: {
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
        isLoggedIn: false,
      },
      ui: {
        ...state.ui,
        loading: false,
        showCheckoutLogin: true,
      },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
  },
  [actions.USER_LOGIN_INFO]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      isLoggedIn: action.payload.isLoggedIn,
      userCreds: action.payload.userCreds,
      instagramCode: action.payload.instagramCode,
      isVerified: action.payload.isVerified,
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
  [actions.GET_GEO_SHIPPING_DETAILS]: (state) => {
    const shippingInfo = cookies.get('shippingInfo');
    return Object.assign({}, state, {
      data: {
        ...state.data,
        geoShippingDetails: {
          ...shippingInfo,
        },
      },
    });
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
      ui: {
        ...state.ui,
        loading: false,
      },
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
        ui: {
          ...state.ui,
          loading: false,
        },
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
  //   data: {
  //     ...state.data,
  //     showLoginScreen: true,
  //     // isLoggedIn: (cookies.get('isVerified') && (cookies.get('isVerified') !== 'false')),
  //   },
  // }),
  [actions.RESET_SHOW_LOGIN]: (state) => {
    const { v2 } = state;
    if (state.v2.active.activePage !== 'thank_you') {
      v2.active = '';
      v2.currentFlow = '';
    }
   
    return Object.assign({}, state, {
      v2: {
        ...state.v2,
        ...v2,
      },
      ...state,
      data: {
        ...state.data,
        // isLoggedIn: (cookies.get('isVerified') && (cookies.get('isVerified') !== 'false')),
        showLoginScreen: state.v2.active.activePage === 'thank_you' ? true : false,
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
  [actions.VERIFY_EMAIL]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true } }),
    FULFILLED: (state, action) => {
      const { v2, ui } = state;
      if (action && action.payload && action.payload.data && action.payload.data.Response === 'SUCCESS') {
        v2.active = pageFlows[state.v2.currentFlow][state.v2.active.nextPage];
        ui.showCheckoutLogin = state.v2.active.nextPage === null ? false : true;
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          userInfoData: {
            ...state.data.userInfoData,
            email_verified: 'V',
          },
          isLoggedIn: true,
        },
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
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
  },
  [actions.VERIFY_EMAIL_BY_LINK]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true  } }),
    FULFILLED: (state, action) => {
      const { v2, ui } = state;
      if (action && action.payload && action.payload.data && action.payload.data.Response === 'SUCCESS') {
        ui.showEmailVerifySuccess = true;
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          userInfoData: {
            ...state.data.userInfoData,
            email_verified: 'V',
          },
          isLoggedIn: true,
        },
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
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
  },
  [actions.VERIFY_RESEND_EMAIL]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        ...action.payload,
      },
      ui: { ...state.ui, loading: false },
    }),
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
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
      if (action && action.payload && action.payload.status === 200) {
        data.showLoginScreen = true;
        data.showResetScreen = false;
        data.showUserInfo = true;
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
          isLoggedIn: true,
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
      const { data } = state;
      if (action && action.payload && action.payload.Response === 'SUCCESS') {
        data.showEmailSuccess = true;
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
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

  [actions.SKIP_AND_CONTINUE]: (state) => {
    return Object.assign({}, state, {
      ...state,
      data: {
        ...state.data,
        showCheckoutLogin: false,
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
      const { data } = state;
      if (action && action.payload && action.payload.data && action.payload.data.Response === 'SUCCESS') {
        data.showEmailSuccess = false;
        data.showOtpSuccess = true;
      }
      return Object.assign({}, state, {
        data: {
          ...state.data,
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
  [actions.SHIPPING_ACCOUNT]: {
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
          showCheckoutLogin: false,
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
