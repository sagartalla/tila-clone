import { actionCreators } from '../auth';

const loginReq = (fn) => {
  return (...args) => (dispatch, getState) => {
    const state = getState();
    const ret = fn(...args);
    if(state.authReducer.data.isLoggedIn){
      if(typeof ret === 'function') {
        ret(dispatch, getState);
      } else {
        dispatch(ret);
      }
    } else {
      dispatch(actionCreators.storePostLoginActionInfo(ret));
      dispatch(actionCreators.showLogin());
    }
  };
};

export default loginReq;
