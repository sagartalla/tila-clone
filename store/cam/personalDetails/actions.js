import apis from './api';
import authApis from '../../auth/api';

const actions = {
  GET_USER_PROFILE_INFO: 'GET_USER_PROFILE_INFO',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  EDIT_PERSONAL_INFO: 'EDIT_PERSONAL_INFO',
  RESET_PASSWORD_INFO_STORE: 'RESET_PASSWORD_INFO_STORE',
  DEACTIVATE_USER_PROFILE: 'DEACTIVATE_USER_PROFILE',
  RESET_PASSWORD: 'RESET_PASSWORD',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  USER_UPDATE_FETCH_OTP:'USER_UPDATE_FETCH_OTP',
  VERIFY_OTP:'VERIFY_OTP',
  UPLOAD_PROFILE_PIC: 'UPLOAD_PROFILE_PIC',
  DOWNLOAD_PROFILE_PIC: 'DOWNLOAD_PROFILE_PIC',
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
  uploadProfilePic: (body) => {
    return ({
      type: actions.UPLOAD_PROFILE_PIC,
      payload: apis.uploadProfilePic(body),
    });
  },
  downloadPic: (imageId) => {
    return ({
      type: actions.DOWNLOAD_PROFILE_PIC,
      payload: apis.downloadPic(imageId),
    })
  },
  verifyOtp: params => dispatch => dispatch({
    type: actions.VERIFY_OTP,
    payload: apis.verifyOtp(params),
  }).then(() => {
    dispatch(actionCreators.getUserProfileInfo());
  }),

  otpUserUpdate: (params) => {
    return {
      type:actions.USER_UPDATE_FETCH_OTP,
      payload:apis.otpUserUpdate(params)
    }
  },
  resetPassword: (body) => {
    return ({
      type: actions.RESET_PASSWORD,
      payload: apis.resetPassword(body),
    });
  },
  forgotPassword: (body) => {
    return ({
      type: actions.FORGOT_PASSWORD,
      payload: apis.forgotPassword(body),
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
