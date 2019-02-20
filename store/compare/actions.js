import api from './api';

const actions = {
  CRUD_COMPARE: 'ADD_TO_COMPARE',
  GET_COMPARE_ITEM_DATA: 'GET_COMPARE_ITEM_DATA',
  GET_COMPARE_COUNT: 'GET_COMPARE_COUNT',
};

const actionCreators = {
  addToCompare: params => ({
    type: actions.CRUD_COMPARE,
    payload: api.addToCompare(params),
  }),
  getCompareCount: () => ({
    type: actions.CRUD_COMPARE,
    payload: api.getCompareCount(),
  }),
  getCompareItemsData: params => ({
    type: actions.GET_COMPARE_ITEM_DATA,
    payload: api.getCompareItemsData(params),
  }),
  removeCompareData: id => ({
    type: actions.CRUD_COMPARE,
    payload: api.removeCompareData(id),
  }),
};

export { actions, actionCreators };
