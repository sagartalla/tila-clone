import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  data: {}
};

const captchaReducer = typeToReducer({
  [actions.CAPTCHA_DISPLAY]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload, ui: { loading: true } });
    },
  },
  [actions.VERIFY_CAPTCHA]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload, ui: { loading: true } })
    }
  }
}, initialState);

export default captchaReducer;
