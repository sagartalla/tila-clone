import api from './api';
import loginReq from '../helper/loginReq';
import refStore from '../refHandler';

const actions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGIN_INFO: 'USER_LOGIN_INFO',
  SET_COUNTRY: 'SET_COUNTRY',
  SET_SESSION_ID: 'SET_SESSION_ID',
  DERIVE_CITY: 'DERIVE_CITY',
  SET_CITY: 'SET_CITY',
  AUTOCOMPLETE_CITY: 'AUTOCOMPLETE_CITY',
  RESET_AUTOCOMPLETE_CITY: 'RESET_AUTOCOMPLETE_CITY',
  RESET_LOGIN_ERROR: 'RESET_LOGIN_ERROR',
  SHOW_LOGIN: 'SHOW_LOGIN',
  RESET_SHOW_LOGIN: 'RESET_SHOW_LOGIN',
  STORE_POST_LOGIN_ACTION_INFO: 'STORE_POST_LOGIN_ACTION_INFO',
  DELETE_POST_LOGIN_ACTION_INFO: 'DELETE_POST_LOGIN_ACTION_INFO'
};

const actionCreators = {
  userLogin: (params) => (dispatch, getState) => {
    return dispatch({
      type: actions.USER_LOGIN,
      payload: api.userLogin(params)
    }).then(() => {
      if(typeof refStore.postLoginRef === 'function') {
        refStore.postLoginRef(dispatch, getState)
      } else {
        dispatch(refStore.postLoginRef);
        dispatch(actions.DELETE_POST_LOGIN_ACTION_INFO);
      }
    });
  },
  userRegister: (params) => (dispatch, getState) => {
    return dispatch({
      type: actions.USER_REGISTER,
      payload: api.userRegister(params).then((res) => {
        if (res.status === 200) {
          const { email, password, rememberMe } = params;
          dispatch(
            actionCreators.userLogin({
              username: email,
              password,
              rememberMe,
            })
          );
          return res;
        } else {
          return Promise.reject(res);
        }
      })
    });
  },
  userLogout: () => {
    api.userLogout();
    return ({
      type: actions.USER_LOGOUT,
    })
  },
  getLoginInfo: () => {
    return {
      type: actions.USER_LOGIN_INFO,
      payload: api.getLoginInfo()
    }
  },
  setCountry: (country) => {
    return {
      type: actions.SET_COUNTRY,
      payload: api.setCountry(country)
    }
  },
  setSessionID: (sessionId) => {
    return {
      type: actions.SET_SESSION_ID,
      payload: api.setSessionID(sessionId)
    }
  },
  deriveCity: (params) => {
    return {
      type: actions.DERIVE_CITY,
      payload: api.deriveCity(params),
    }
  },
  setCity: (params) => {
    return {
      type: actions.SET_CITY,
      payload: api.setCity(params),
    }
  },
  autoCompleteCity: (params) => {
    return {
      type: actions.AUTOCOMPLETE_CITY,
      payload: api.autoCompleteCity(params),
    }
  },
  resetAutoCompleteData: () => {
    return {
      type: actions.RESET_AUTOCOMPLETE_CITY,
    }
  },
  resetLoginError: () => {
    return {
      type: actions.RESET_LOGIN_ERROR,
    }
  },
  showLogin: () => {
    return {
      type: actions.SHOW_LOGIN
    }
  },
  storePostLoginActionInfo: (ret) => {
    return {
      type: actions.STORE_POST_LOGIN_ACTION_INFO,
      payload: {
        ref: ret
      }
    }
  },
  deletePostLoginActionInfo: () => ({
    type: actions.DELETE_POST_LOGIN_ACTION_INFO
  }),
  resetShowLogin: () => ({
    type: actions.RESET_SHOW_LOGIN
  })
};

export { actions, actionCreators };
