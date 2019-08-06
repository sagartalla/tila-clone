import { actions } from '../auth';

const refStore = {};
const refHandler = ({ getState }) => {
  return next => (action) => {
    switch (action.type) {
      case actions.STORE_POST_LOGIN_ACTION_INFO:
        refStore.postLoginRef = action.payload.ref;
        break;
      case actions.DELETE_POST_LOGIN_ACTION_INFO:
        delete refStore.postLoginRef;
        break;
      default: break;
    }
    const returnValue = next(action);
    return returnValue;
  };
};

export { refHandler };
export default refStore;
