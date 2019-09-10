import api from './api';

const actions = {
  GET_ORDER_HISTORY: 'GET_ORDER_HISTORY',
  GET_WARRANTY_HISTORY:'GET_WARRANTY_HISTORY',
};

const actionCreators = {
  getOrderHistory: (pageSize) => {
    return ({
      type: actions.GET_ORDER_HISTORY,
      payload: api.getOrderHistory(pageSize),
    });
  },
  getWarrantyHistory:(pageSize) => {
    return ({
      type:actions.GET_WARRANTY_HISTORY,
      payload:api.getWarrantyHistory(pageSize),
    })
  },
};

export { actions, actionCreators };
