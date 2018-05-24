import api from './api';

const actions = {
  GET_ORDER_DETAILS: 'GET_ORDER_DETAILS'
};

const actionCreators = {
  getOrderDetails: (params) => {
    return ({
      type: actions.GET_ORDER_DETAILS,
      payload: api.getOrderDetails(params)
    })
  }
};

export { actions, actionCreators };

