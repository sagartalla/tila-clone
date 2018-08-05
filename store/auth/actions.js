import api from './api';

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
};

const actionCreators = {
  userLogin: (params) => {
    return ({
      type: actions.USER_LOGIN,
      payload: api.userLogin(params)
    });
  },
  userRegister: (params) => (dispatch, getState) => {
    return dispatch({
      type: actions.USER_REGISTER,
      payload: api.userRegister(params).then((res) => {
        const { email, password } = params;
        if (res.status === 200) {
          const { email, password } = params;
          dispatch(
            actionCreators.userLogin({
              username: email,
              password,
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
  }
};

export { actions, actionCreators };
