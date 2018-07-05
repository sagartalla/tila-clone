import api from './api';

const actions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGIN_INFO: 'USER_LOGIN_INFO',
  SET_COUNTRY: 'SET_COUNTRY',
  SET_SESSION_ID: 'SET_SESSION_ID',
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
  }
};

export { actions, actionCreators };
