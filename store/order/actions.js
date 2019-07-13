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
  SET_EXCHANGE_ORDER: 'SET_EXCHANGE_ORDER',
  SUBMIT_ORDER_RETURN: 'SUBMIT_ORDER_RETURN',
  SET_ADDRESS_DATA: 'SET_ADDRESS_DATA',
  GET_REFUND_OPTIONS: 'GET_REFUND_OPTIONS',
  GET_TRACKING_DETAILS: 'GET_TRACKING_DETAILS',
  THANKYOU_PAGE_TRACK: 'THANKYOU_PAGE_TRACK',
  CANCEL_ORDER_TRACK: 'CANCEL_ORDER_TRACK',
  SET_CANCEL_REFUNDMODE: 'SET_CANCEL_REFUNDMODE',
  GET_INVOICE_DETAILS: 'GET_INVOICE_DETAILS',
};

const actionCreators = {
  getOrderDetails: params => ({
    type: actions.GET_ORDER_DETAILS,
    payload: api.getOrderDetails(params),
  }),
  raiseOrderIssue: (params) => {
    const {
      issueType, items, defaultStep, orderId,
    } = params;
    return ({
      type: actions.RAISE_ORDER_ISSUE,
      payload: {
        data: {
          issueType,
          items,
          step: defaultStep,
          orderId,
        },
      },
    });
  },
  setExchangeOrder: params => (
    {
      type: actions.SET_EXCHANGE_ORDER,
      payload: api.setExchangeOrder(params),
    }
  ),
  goToNextStep: (params) => {
    const { nextStep } = params;
    return ({
      type: actions.GO_TO_NEXT_STEP,
      payload: {
        data: {
          step: nextStep,
        },
      },
    });
  },
  track: params => (dispatch, getState) => {
    console.log(params);
    const state = getState();
    params.postResult = state.cartReducer.data.items;
    return {
      type: actions.THANKYOU_PAGE_TRACK,
      payload: api.track(params),
    };
  },
  // cancelOrderTrack: params => (dispatch, getState) => {
  //   console.log(params);
  //   const state = getState();
  //   params.postResult = state.cartReducer.data.items;
  //   return {
  //     type: actions.CANCEL_ORDER_TRACK,
  //     payload: api.cancelTrack(params),
  //   };
  // },
  setSelectedItem: params => ({
    type: actions.SET_SELECTED_ITEM,
    payload: {
      data: {
        selectedItem: params.selectedItem,
      },
    },
  }),
  setCancelRefundMode: param => ({
    type:actions.SET_CANCEL_REFUNDMODE,
    payload:{
      data:param
    },
  }),
  getRefundOptions: (orderItemId, issueType) => ({
    type: actions.GET_REFUND_OPTIONS,
    payload: api.getRefundOptions(orderItemId, issueType),
  }),
  setReason: params => ({
    type: actions.SET_REASON,
    payload: {
      data: {
        reason: params.reason,
        comment: params.comment,
        sub_reasons: params.subReason,
      },
    },
  }),
  resetOrderIssue: () => ({
    type: actions.RESET_ORDER_ISSUE,
  }),
  getReasons: (params,reasonType) => ({
    type: actions.GET_REASONS,
    payload: api.getReasons(params,reasonType),
  }),
  submitCancelRequest: params => ({
    type: actions.SUBMIT_CANCEL_REQUEST,
    payload: api.submitCancelRequest(params),
  }),
  setReturnExchangeType: params => ({
    type: actions.SET_RETURN_EXCHANGE_TYPE,
    payload: {
      data: {
        returnExchangeType: params.returnExchangeType,
      },
    },
  }),
  setOrderIssueData: params => ({
    type: actions.SET_ORDER_ISSUE_DATA,
    payload: {
      data: {
        ...params,
      },
    },
  }),
  setAddressData: params => ({
    type: actions.SET_ADDRESS_DATA,
    payload: {
      data: {
        ...params,
      },
    },
  }),
  selectAddressForReturnExchange: params => ({
    type: actions.SET_RETURN_EXCHANGE_ADDRESS,
    payload: {
      data: {
        addressId: params.addressId,
      },
    },
  }),
  submitReturnRequest: params => ({
    type: actions.SUBMIT_RETURN_REQUEST,
    payload: api.submitReturnRequest(params),
  }),
  getExchangeVariants: params => ({
    type: actions.GET_EXCHANGE_VARIANTS,
    payload: api.getExchangeVariants(params),
  }),
  setVariantOption: params => ({
    type: actions.SET_VARIANT_OPTION,
    payload: {
      data: {
        ...params,
      },
    },
  }),
  sendMapData: (order_id, params) => ({
    type: actions.SEND_MAP_DATA,
    payload: api.sendMapDataApi(order_id, params),
  }),
  getTrackingDetails: trackingId => ({
    type: actions.GET_TRACKING_DETAILS,
    payload: api.getTrackingDetails(trackingId),
  }),
  getInvoice: order_id => ({
    type: actions.GET_INVOICE_DETAILS,
    payload: api.getInvoice(order_id),
  }),
};


export { actions, actionCreators };
