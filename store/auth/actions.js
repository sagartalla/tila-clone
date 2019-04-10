import api from './api';
import loginReq from '../helper/loginReq';
import refStore from '../refHandler';
import { actionCreators as cartActionCreators } from '../cart';

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
  }),
  userRegister: params => (dispatch, getState) => dispatch({
    type: actions.USER_REGISTER,
    payload: api.userRegister(params).then((res) => {
      if (res.status === 200) {
        const { email, password, rememberMe } = params;
        dispatch(actionCreators.userLogin({
          username: email,
          password,
          rememberMe,
        }));
        return res;
      }
      return Promise.reject(res);
    }),
  }),
  userLogout: () => (dispatch) => {
    dispatch(cartActionCreators.getCartResults())
    dispatch({
      type: actions.USER_LOGOUT,
      payload: api.userLogout(),
    });
  },
  getLoginInfo: () => ({
    type: actions.USER_LOGIN_INFO,
    payload: api.getLoginInfo(),
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
  track: (event,params) => (dispatch, getState) => {
    const state = getState();
    return {
      type: actions.CART_TRACK,
      payload: api.track(event,params),
    };
  }
};

export { actions, actionCreators};
