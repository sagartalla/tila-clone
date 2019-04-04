import api from './api';

const actions = {
  GET_ORDER_HISTORY: 'GET_ORDER_HISTORY',
};

const actionCreators = {
  getOrderHistory: (pageSize) => {
    return ({
      type: actions.GET_ORDER_HISTORY,
      payload: api.getOrderHistory(pageSize)
    });
  }
}

export { actions, actionCreators };
