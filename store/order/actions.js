import api from './api';

const actions = {
  GET_ORDER_DETAILS: 'GET_ORDER_DETAILS',
  RAISE_ORDER_ISSUE: 'RAISE_ORDER_ISSUE',
  GO_TO_NEXT_STEP: 'GO_TO_NEXT_STEP',
  SET_SELECTED_ITEM: 'SET_SELECTED_ITEM',
  RESET_ORDER_ISSUE: 'RESET_ORDER_ISSUE',
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
          step: 'list',
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
  resetOrderIssue: () => {
    return {
      type: actions.RESET_ORDER_ISSUE,
    }
  },
  getReasons: () => {
    return ({
      type: actions.GET_ORDER_DETAILS,
      payload: api.getReasons(params)
    })
  } 
};


export { actions, actionCreators };

