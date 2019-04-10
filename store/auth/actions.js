import Cookies from 'universal-cookie';
import api from './api';
import loginReq from '../helper/loginReq';
import refStore from '../refHandler';
import { actionCreators as cartActionCreators } from '../cart';

const cookies = new Cookies();

const actions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGIN_INFO: 'USER_LOGIN_INFO',
  SET_COUNTRY: 'SET_COUNTRY',
  SET_SESSION_ID: 'SET_SESSION_ID',
  DERIVE_CITY: 'DERIVE_CITY',
  SET_CITY: 'SET_CITY',
  REMOVE_CITY: 'REMOVE_CITY',
  AUTOCOMPLETE_CITY: 'AUTOCOMPLETE_CITY',
  RESET_AUTOCOMPLETE_CITY: 'RESET_AUTOCOMPLETE_CITY',
  RESET_LOGIN_ERROR: 'RESET_LOGIN_ERROR',
  SHOW_LOGIN: 'SHOW_LOGIN',
  RESET_SHOW_LOGIN: 'RESET_SHOW_LOGIN',
  STORE_POST_LOGIN_ACTION_INFO: 'STORE_POST_LOGIN_ACTION_INFO',
  DELETE_POST_LOGIN_ACTION_INFO: 'DELETE_POST_LOGIN_ACTION_INFO',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SAVE_PTA: 'SAVE_PTA',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
  VERIFY_RESEND_EMAIL: 'VERIFY_RESEND_EMAIL',
  GET_USER_INFO: 'GET_USER_INFO',
};

const actionCreators = {
  userLogin: params => (dispatch, getState) => dispatch({
    type: actions.USER_LOGIN,
    payload: api.userLogin(params),
  }).then(() => {
    dispatch(cartActionCreators.getCartResults());
    if (typeof refStore.postLoginRef === 'function') {
      refStore.postLoginRef(dispatch, getState);
    } else if (refStore.postLoginRef) {
      dispatch(refStore.postLoginRef);
      dispatch(actions.DELETE_POST_LOGIN_ACTION_INFO);
    }
    dispatch(actionCreators.getUserInfoData({initiateEmailVerification: params.channel === 'BASIC_REGISTER'})).then((res) => {
      if(params.channel !== 'BASIC_REGISTER') {
        if (res && res.value && res.value.data && res.value.data.email_verified === 'NV') {
          dispatch(actionCreators.setVerfied(false))/*.then(() => dispatch(actionCreators.getLoginInfo()));*/
          dispatch(actionCreators.sendOtpToEmailId(false));
        } else {
          dispatch(actionCreators.setVerfied(true))/*.then(() => dispatch(actionCreators.getLoginInfo()));*/
        }
      }
      return res;
    });
  }),
  userLogout: () => (dispatch) => {
    dispatch(cartActionCreators.getCartResults());
    dispatch({
      type: actions.USER_LOGOUT,
      payload: api.userLogout(),
    });
  },
  getLoginInfo: (params) => ({
    type: actions.USER_LOGIN_INFO,
    payload: api.getLoginInfo(params),
  }),
  setCountry: country => ({
    type: actions.SET_COUNTRY,
    payload: api.setCountry(country),
  }),
  setSessionID: sessionId => ({
    type: actions.SET_SESSION_ID,
    payload: api.setSessionID(sessionId),
  }),
  deriveCity: params => ({
    type: actions.DERIVE_CITY,
    payload: api.deriveCity(params),
  }),
  setCity: params => ({
    type: actions.SET_CITY,
    payload: api.setCity(params),
  }),
  removeCity: () => ({
    type: actions.REMOVE_CITY,
    payload: api.removeCity(),
  }),
  autoCompleteCity: params => ({
    type: actions.AUTOCOMPLETE_CITY,
    payload: api.autoCompleteCity(params),
  }),
  resetAutoCompleteData: () => ({
    type: actions.RESET_AUTOCOMPLETE_CITY,
  }),
  resetLoginError: () => ({
    type: actions.RESET_LOGIN_ERROR,
  }),
  showLogin: () => ({
    type: actions.SHOW_LOGIN,
  }),
  storePostLoginActionInfo: ret => ({
    type: actions.STORE_POST_LOGIN_ACTION_INFO,
    payload: {
      ref: ret,
    },
  }),
  deletePostLoginActionInfo: () => ({
    type: actions.DELETE_POST_LOGIN_ACTION_INFO,
  }),
  resetShowLogin: () => ({
    type: actions.RESET_SHOW_LOGIN,
  }),
  setLanguage: language => ({
    type: actions.SET_LANGUAGE,
    payload: api.setLanguage(language),
  }),
  savePtaToken: ptaToken => ({
    type: actions.SAVE_PTA,
    payload: api.savePtaToken(ptaToken),
  }),
  verifyEmailId: value => (dispatch, getState) => {
    dispatch({
      type: actions.VERIFY_EMAIL,
      payload: api.verifyEmail(value),
    }).then(() => {
      dispatch(actionCreators.setVerfied(true));
    }, () => {
      dispatch(actionCreators.setVerfied(false));
    })
  },
  sendOtpToEmailId: (status = true) => ({
    type: actions.VERIFY_RESEND_EMAIL,
    payload: api.sendOtpToEmailId(status),
  }),
  getUserInfoData: (params={}) => ({
    type: actions.GET_USER_INFO,
    payload: api.getUserInfo(params),
  }),
  setVerfied: isVerified => ({
    type: actions.SET_VERFIED,
    payload: api.setVerfied(isVerified),
  }),
};
track: (event,params) => (dispatch, getState) => {
  const state = getState();
  return {
    type: actions.CART_TRACK,
    payload: api.track(event,params),
  };
},

export { actions, actionCreators};
