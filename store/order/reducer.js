import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
    ui: {
        loading: false,
    },
    data: {
			orderDetails: {},
      claimWarranty:{},
			orderIssue: {
        items: [],
        reasons: [],
        cancelStatus: {},
        exchangeVariants: [],
        selectedReasons:{},
        refundOptions:{},
        exchangeId:{},
        refundInitiated:false,
        cancelRefundMode: '',
      },
    orderTracker: {},
  },
  error: '',
  error_code: ''
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
            ...action.payload.data,
          }
        },
        ui: { loading: false }
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, error_code: action.payload.response.status, ui: { loading: false } })
    },
  },
  [actions.SUBMIT_CLAIM_WARRANTY] : {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state, action) => {
      return Object.assign ( {}, state, {
        data:{
        ...state.data,
        claimWarranty: {
          ...state.data.claimWarranty,
          ...action.payload.data
        }
      },
      ui: { loading: false }
    });
  },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui:{ loading: false } })
    }
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
  [actions.GET_REFUND_OPTIONS]: {
    PENDING: state => {
      return Object.assign({},state,{ ui: { loading: true }})
    },
    FULFILLED: (state,action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderIssue: {
            ...state.data.orderIssue,
            refundOptions: action.payload.data,
          }
        }
      }
    },
    REJECTED: (state,action) => {
      return Object.assign({}, state, { error: action.payload.response.data.message, ui: { loading: false } })
    },
  },
  [actions.SET_EXCHANGE_ORDER]: {
    PENDING: state => {
      return Object.assign({},state,{ ui: { loading: true }})
    },
    FULFILLED: (state,action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderIssue: {
            ...state.data.orderIssue,
            exchangeId: action.payload.data
          }
        },
        ui: { loading: false }
      }
    },
    REJECTED: (state,action) => {
      return Object.assign(
        {},
        state,
        { error: action.payload.response.data.message,
        ui: { loading: false }})
    },
  },
  [actions.SET_RETURN_ORDER]: {
    PENDING: state => {
      return Object.assign({},state,{ ui: { loading: true }})
    },
    FULFILLED: (state,action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderIssue: {
            ...state.data.orderIssue,
            replacementId: action.payload.data,
          }
        },
        ui: { loading: false }
      }
    },
    REJECTED: (state,action) => {
      return Object.assign(
        {},
        state,
        { error: action.payload.response.data.message,
        ui: { loading: false }})
    },
  },
  [actions.SET_ADDRESS_DATA]: (state,action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          selectedReasons: action.payload.data

        }
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
  [actions.SET_CANCEL_REFUNDMODE] : (state,action) => {
    return {
      ...state,
      data:{
        ...state.data,
        orderIssue:{
          ...state.data.orderIssue,
          cancelRefundMode:action.payload.data
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
    };
  },
  [actions.SET_RETURN_EXCHANGE_TYPE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          returnExchangeType: action.payload.data.returnExchangeType
        }
      }
    };
  },
  [actions.GET_REASONS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderIssue: {
            ...state.data.orderIssue,
            reasons: action.payload.data,
          }
        },
        ui: { loading: false }
      };
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.SET_REASON]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          selectedReasons: action.payload.data,
        }
      }
    }
  },
  [actions.SUBMIT_CANCEL_REQUEST]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderIssue: {
            ...state.data.orderIssue,
            cancelStatus: action.payload.data
          }
        },
        ui: { loading: false }
      };
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.SET_ORDER_ISSUE_DATA]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          ...action.payload.data,
        }
      }
    }
  },
  [actions.SET_RETURN_EXCHANGE_ADDRESS]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          returnExchangeAddressId: action.payload.data.addressId,
        }
      }
    }
  },
  [actions.SUBMIT_RETURN_REQUEST]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderIssue: {
            ...state.data.orderIssue,
            returnStatus: action.payload.data,
            refundInitiated:true
          }
        },
        ui: { loading: false }
      };
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.GET_EXCHANGE_VARIANTS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderIssue: {
            ...state.data.orderIssue,
            exchangeVariants: action.payload.data
          }
        },
        ui: { loading: false }
      };
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.SET_VARIANT_OPTION]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        orderIssue: {
          ...state.data.orderIssue,
          selectedVariant: {
            ...action.payload.data
          }
        }
      }
    };
  },
  [actions.GET_TRACKING_DETAILS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          orderTracker: {
            ...action.payload.data,
          },
        },
      };
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
}, initialState);

export default productReducer;
