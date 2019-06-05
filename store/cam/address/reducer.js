import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  data: {},
  changeValue: false
};

const shippingAddrReducer = typeToReducer({
  [actions.GET_SHIPPING_ADDR_RESULTS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: _.sortBy(action.payload.data, (o) => { return !o.default; }), ui: { loading: true } });
    },
  },
  [actions.SEND_NEW_ADDR_DETAILS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {

      // updating user added params/options to store.
      const addr_id_add = Object.assign({}, action.payload.options, { 'address_id': action.payload.data.address_id });
      const tempState = state.data ? state.data : state;
      const newData = tempState.map((val, index) => {
        val.default = false;
        return val;
      });
      return Object.assign(
        {},
        state,
        {
          data: _.values(Object.assign({}, newData, { [Object.keys(tempState).length + 1]: addr_id_add })),
          deliverToAddress: action.payload.data.address_id,
          ui: { loading: true }
        });
    },
  },
  [actions.EDIT_ADDR_DETAILS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      const temp_data = state.data.map((obj, index) => {
        if (obj.address_id === action.payload.options.address_id) {
          obj = action.payload.options
        }
        return obj;
      })

      return Object.assign(
        {},
        state,
        {
          data: _.values(temp_data),
          ui: { loading: true }
        });
    },
  },
  [actions.DELETE_ADDRESS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      const newData = _.filter(state.data, function (value, key) { return value.address_id != action.payload.addrId; })
      return Object.assign({}, state, { data: newData, ui: { loading: true } });
    },
  },
  [actions.MAKE_DEFAULT_ADDR]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
    FULFILLED: (state, action) => {
      const newData = state.data.map((val, index) => {
        if (val.address_id == action.payload.addrId) {
          val.default = true;
        } else {
          val.default = false;
        }
        return val;
      });
      return Object.assign({}, state, { data: newData, ui: { loading: true } });
    },
  },
  [actions.SELECT_DELIVER_TO_ADDRESS]: (state, action) => {
    return {
      ...state,
      deliverToAddress: action.payload
    }
  },
  [actions.CHANGE_STORE]: (state, action) => {
    return {
      ...state,
      changeValue: !state.changeValue
    }
  }
}, initialState);

export default shippingAddrReducer;
