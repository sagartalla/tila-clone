import apis from './api';

const actions = {
  GET_ORDER_STATUS_DETAILS: 'GET_ORDER_STATUS_DETAILS'
};

const actionCreators = {
  getOrderStatusDetails: (params) => (dispatch, getState) => {
    return ({
      type: actions.GET_ORDER_STATUS_DETAILS,
      payload: apis.getOrderStatusDetails(params),
    });
  }
};

export { actions, actionCreators };

