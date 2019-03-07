import api from './api';

const actions = {
  CRUD_COMPARE: 'ADD_TO_COMPARE',
  CRUD_COMPARE_STATE: 'CRUD_COMPARE_STATE',
  GET_COMPARE_ITEM_DATA: 'GET_COMPARE_ITEM_DATA',
  GET_COMPARE_COUNT: 'GET_COMPARE_COUNT',
  GET_BRANDS: 'GET_BRANDS',
  GET_PRODUCTS_TO_COMPARE: 'GET_PRODUCTS_TO_COMPARE',
  ADD_PRODUCT_TO_COMPARE: 'ADD_PRODUCT_TO_COMPARE',
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
  getBrands: () => ({
    type: actions.GET_BRANDS,
    payload: api.getBrands(),
  }),
  getProducts: param => ({
    type: actions.GET_PRODUCTS_TO_COMPARE,
    payload: api.getProducts(param),
  }),
  getCompareItemsData: () => ({
    type: actions.GET_COMPARE_ITEM_DATA,
    payload: api.getCompareItemsData(),
  }),
  removeCompareData: id => ({
    type: actions.CRUD_COMPARE,
    payload: api.removeCompareData(id),
  }),
  removeCompareItem: id => ({
    type: actions.CRUD_COMPARE_STATE,
    payload: api.removeCompareData(id),
  }),
};

export { actions, actionCreators };
