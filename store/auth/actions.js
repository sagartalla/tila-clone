import api from './api';

const actions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGIN_INFO: 'USER_LOGIN_INFO',
};

const actionCreators = {
  userLogin: (params) => {
    return ({
      type: actions.USER_LOGIN,
      payload: api.login(params)
    });
  },
  userLogout:() => {
    api.logout();
    return ({
      type: actions.USER_LOGOUT,
    })
  },
  getLoginInfo: () => {
    return {
      type: actions.USER_LOGIN_INFO,
      payload: api.getLoginInfo()
    }
  }
};

export { actions, actionCreators };
