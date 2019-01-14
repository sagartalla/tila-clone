import apis from './api';
import authApis from '../../auth/api';

const actions = {
  GET_USER_PROFILE_INFO: 'GET_USER_PROFILE_INFO',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  EDIT_PERSONAL_INFO: 'EDIT_PERSONAL_INFO',
  RESET_PASSWORD_INFO_STORE: 'RESET_PASSWORD_INFO_STORE',
  DEACTIVATE_USER_PROFILE: 'DEACTIVATE_USER_PROFILE',
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
  },
  EditPersonalInfo: (body) => {
    return ({
      type: actions.EDIT_PERSONAL_INFO,
      payload: apis.editPersonalInfo(body),
    });
  },
  resetPasswordInfoStore: () => {
    return ({
      type: actions.RESET_PASSWORD_INFO_STORE,
      payload: {},
    });
  },
  deactivateUserProfile: () => {
    authApis.userLogout();
    return ({
      type: actions.DEACTIVATE_USER_PROFILE,
      payload: apis.deactivateUserProfile(),
    });
  },
};

export { actions, actionCreators };

