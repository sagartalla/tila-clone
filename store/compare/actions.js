import api from './api';

const actions = {
  ADD_TO_COMPARE: 'ADD_TO_COMPARE',
  GET_COMPARE_ITEM_DATA: 'GET_COMPARE_ITEM_DATA',
};

const actionCreators = {
  addToCompare: (params) => ({
    type: actions.ADD_TO_COMPARE,
    payload: api.addToCompare(params),
  }),
  getCompareItemsData: (params) => ({
    type: actions.GET_COMPARE_ITEM_DATA,
    payload: api.getCompareItemsData(params),
  })
};

export { actions, actionCreators };
