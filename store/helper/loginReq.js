import { actionCreators } from '../auth';

const loginReq = (fn) => {
  return (...args) => (dispatch, getState) => {
    const state = getState();
    const ret = fn(...args);
    if(state.authReducer.data.isLoggedIn){
      if(typeof ret === 'function') {
        return ret(dispatch, getState);
      } else {
        return dispatch(ret);
      }
    } else {
      dispatch(actionCreators.storePostLoginActionInfo(ret));
      return dispatch(actionCreators.showLogin());
    }
  };
};

export default loginReq;
