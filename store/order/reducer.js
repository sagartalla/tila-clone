import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
    ui: {
        loading: false,
    },
    data: {
			orderDetails: {},
			orderIssue: {},
    },
    error: {},
};

const productReducer = typeToReducer({
  [actions.GET_ORDER_DETAILS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { 
        data: {
          ...state.data,
          orderDetails: {
            ...state.data.orderDetails,
            ...action.payload.data
          }
        }, 
        ui: { loading: true } 
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.RAISE_ORDER_ISSUE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          ...action.payload.data
        }
      }
    }
  },
  [actions.GO_TO_NEXT_STEP]: (state, action) => {
    let orderIssue = {};
    const step = action.payload.data.step;
    if (step !== null) {
      orderIssue = {
        ...state.data.orderIssue,
      }
    }
    orderIssue.step = step;
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue,
      }
    }
  },
  [actions.SET_SELECTED_ITEM]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          selectedItem: action.payload.data.selectedItem
        }
      }
    }
  },
  [actions.RESET_ORDER_ISSUE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: initialState.data.orderIssue
      }
    }
  }
}, initialState);

export default productReducer;