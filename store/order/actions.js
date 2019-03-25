import api from './api';

const actions = {
  GET_ORDER_DETAILS: 'GET_ORDER_DETAILS',
  RAISE_ORDER_ISSUE: 'RAISE_ORDER_ISSUE',
  GO_TO_NEXT_STEP: 'GO_TO_NEXT_STEP',
  SET_SELECTED_ITEM: 'SET_SELECTED_ITEM',
  RESET_ORDER_ISSUE: 'RESET_ORDER_ISSUE',
  GET_REASONS: 'GET_REASONS',
  SET_REASON: 'SET_REASON',
  SUBMIT_CANCEL_REQUEST: 'SUBMIT_CANCEL_REQUEST',
  SET_RETURN_EXCHANGE_TYPE: 'SET_RETURN_EXCHANGE_TYPE',
  SET_ORDER_ISSUE_DATA: 'SET_ORDER_ISSUE_DATA',
  SET_RETURN_EXCHANGE_ADDRESS: 'SET_RETURN_EXCHANGE_ADDRESS',
  SUBMIT_RETURN_REQUEST: 'SUBMIT_RETURN_REQUEST',
  GET_EXCHANGE_VARIANTS: 'GET_EXCHANGE_VARIANTS',
  SET_VARIANT_OPTION: 'SET_VARIANT_OPTION',
  SEND_MAP_DATA: 'SEND_MAP_DATA',
  SET_EXCHANGE_ORDER:'SET_EXCHANGE_ORDER',
  SUBMIT_ORDER_RETURN: 'SUBMIT_ORDER_RETURN',
  SET_ADDRESS_DATA: 'SET_ADDRESS_DATA',
  GET_REFUND_OPTIONS:'GET_REFUND_OPTIONS'
};

const actionCreators = {
  getOrderDetails: (params) => {
    return ({
      type: actions.GET_ORDER_DETAILS,
      payload: api.getOrderDetails(params)
    })
  },
  raiseOrderIssue: (params) => {
    const { issueType, items, defaultStep, orderId } = params;
    return ({
      type: actions.RAISE_ORDER_ISSUE,
      payload: {
        data: {
          issueType,
          items,
          step: defaultStep,
          orderId,
        }
      }
    });
  },
  setExchangeOrder : (params) => {
    return (
      {
        type:actions.SET_EXCHANGE_ORDER,
        payload:api.setExchangeOrder(params)
      }
    )
  },
  goToNextStep: (params) => {
    const { nextStep } = params;
    return ({
      type: actions.GO_TO_NEXT_STEP,
      payload: {
        data: {
          step: nextStep
        }
      }
    });
  },
  setSelectedItem: (params) => {
    return {
      type: actions.SET_SELECTED_ITEM,
      payload: {
        data: {
          selectedItem: params.selectedItem
        }
      }
    }
  },
  getRefundOptions:(params) => {
    return {
      type:actions.GET_REFUND_OPTIONS,
      payload:api.getRefundOptions(params)
    }
  },
  setReason: (params) => {
    return {
      type: actions.SET_REASON,
      payload: {
        data: {
          reason: params.reason,
          comment: params.comment,
          sub_reasons: params.subReason,
        }
      }
    };
  },
  resetOrderIssue: () => {
    return {
      type: actions.RESET_ORDER_ISSUE,
    }
  },
  getReasons: (params) => {
    return ({
      type: actions.GET_REASONS,
      payload: api.getReasons(params)
    })
  },
  submitCancelRequest: (params) => {
    return ({
      type: actions.SUBMIT_CANCEL_REQUEST,
      payload: api.submitCancelRequest(params)
    });
  },
  setReturnExchangeType: (params) => {
    return ({
      type: actions.SET_RETURN_EXCHANGE_TYPE,
      payload: {
        data: {
          returnExchangeType: params.returnExchangeType
        }
      }
    });
  },
  setOrderIssueData: (params) => {
    return ({
      type: actions.SET_ORDER_ISSUE_DATA,
      payload: {
        data: {
          ...params,
        }
      }
    });
  },
  setAddressData: (params) => {
    return ({
      type:actions.SET_ADDRESS_DATA,
      payload:{
        data:{
          ...params,
        }
      }
    })
  },
  selectAddressForReturnExchange: (params) => {
    return ({
      type: actions.SET_RETURN_EXCHANGE_ADDRESS,
      payload: {
        data: {
          addressId: params.addressId,
        }
      }
    });
  },
  submitReturnRequest: (params) => {
    return ({
      type: actions.SUBMIT_RETURN_REQUEST,
      payload: api.submitReturnRequest(params)
    })
  },
  getExchangeVariants: (params) => {
    return ({
      type: actions.GET_EXCHANGE_VARIANTS,
      payload: api.getExchangeVariants(params),
    });
  },
  setVariantOption: (params) => {
    return ({
      type: actions.SET_VARIANT_OPTION,
      payload: {
        data: {
          ...params
        }
      }
    })
  },
  sendMapData: (order_id, params) => {
    return {
      type: actions.SEND_MAP_DATA,
      payload: api.sendMapDataApi(order_id, params)
    }
  }
};


export { actions, actionCreators };
