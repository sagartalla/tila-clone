import Cookies from 'universal-cookie';
import { actionCreators } from '../auth';

const cookies = new Cookies();

const loginReq = (fn) => {
  debugger
  return (...args) => (dispatch, getState) => {
    const state = getState();
    const ret = fn(...args);
    const isLoggedIn = !!cookies.get('auth') || state.authReducer.data.isLoggedIn;
    if (isLoggedIn) {
      if (typeof ret === 'function') {
        return ret(dispatch, getState);
      }
      return dispatch(ret);
    }
    if(window.sessionStorage.getItem('TILuservisitcount') !== '1') {
      dispatch(actionCreators.showLogin())
    }    
    return dispatch(actionCreators.storePostLoginActionInfo(ret));
  };
};

export default loginReq;
