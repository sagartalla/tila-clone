import apis from './api';

const actions = {
  GET_USER_PROFILE_INFO: 'GET_USER_PROFILE_INFO',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD'
};

const actionCreators = {
  getUserProfileInfo: () => {
    return ({
      type: actions.GET_USER_PROFILE_INFO,
      payload: apis.getUserProfileInfo(),
    });
  },
  changePassword: (body) => {
    return ({
      type: actions.CHANGE_PASSWORD,
      payload: apis.changePassword(body),
    });
  }
};

export { actions, actionCreators };

