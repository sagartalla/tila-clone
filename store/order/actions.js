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
};

const actionCreators = {
  getOrderDetails: (params) => {
    return ({
      type: actions.GET_ORDER_DETAILS,
      payload: api.getOrderDetails(params)
    })
  },
  raiseOrderIssue: (params) => {
    const {issueType, items, defaultStep, orderId} = params;
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
  setReason: (params) => {
    return {
      type: actions.SET_REASON,
      payload: {
        data: {
          reason: params.reason,
          comment: params.comment,
        }
      }
    };
  },
  resetOrderIssue: () => {
    return {
      type: actions.RESET_ORDER_ISSUE,
    }
  },
  getReasons: () => {
    return ({
      type: actions.GET_REASONS,
      payload: api.getReasons()
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
      payload: {
        data: {
          ...params,
        }
      }
    })
  }
};


export { actions, actionCreators };
