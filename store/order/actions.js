import api from './api';

const actions = {
  GET_ORDER_DETAILS: 'GET_ORDER_DETAILS',
  RAISE_ORDER_ISSUE: 'RAISE_ORDER_ISSUE'
};

const actionCreators = {
  getOrderDetails: (params) => {
    return ({
      type: actions.GET_ORDER_DETAILS,
      payload: api.getOrderDetails(params)
    })
  },
  raiseOrderIssue: (params) => {
    const {issueType, items} = params;
    return ({
      type: actions.RAISE_ORDER_ISSUE,
      payload: {
        data: {
          issueType,
          items,
        }
      }
    });
  }
};


export { actions, actionCreators };

