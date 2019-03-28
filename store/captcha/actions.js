import apis from './api';

const actions = {
    CAPTCHA_DISPLAY: 'CAPTCHA_DISPLAY',
    VERIFY_CAPTCHA: 'VERIFY_CAPTCHA',
};
const actionCreators = {
  captchaQuestion: (params) => (dispatch) => {
    return dispatch({
      type: actions.CAPTCHA_DISPLAY,
      payload: apis.captchaDisplay(params),
    });
  },

  verifyCaptcha: (captchaDetails) => (dispatch) => {
    return dispatch({
      type: actions.VERIFY_CAPTCHA,
      payload: apis.captchaVerify(captchaDetails)
    });
  }
};

export { actions, actionCreators };
