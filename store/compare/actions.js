import api from './api';

const actions = {
  CRUD_COMPARE: 'CRUD_COMPARE',
  REMOVE_COMPARE_ITEM: 'REMOVE_COMPARE_ITEM',
  GET_COMPARE_ITEM_DATA: 'GET_COMPARE_ITEM_DATA',
  GET_COMPARE_COUNT: 'GET_COMPARE_COUNT',
  GET_BRANDS: 'GET_BRANDS',
  GET_PRODUCTS_TO_COMPARE: 'GET_PRODUCTS_TO_COMPARE',
  ADD_PRODUCT_TO_COMPARE: 'ADD_PRODUCT_TO_COMPARE',
  COMPARE_TRACK: 'COMPARE_TRACK'
};

const actionCreators = {
  addToCompare: params => (dispatch) => {
    dispatch({
      type: actions.CRUD_COMPARE,
      payload: api.addToCompare(params),
    });
    dispatch(actionCreators.track({
      eventName: 'AddTo Compare', params,
    }));
  },
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
  getCompareItemsData: product => (dispatch) => {
    dispatch({
      type: actions.GET_COMPARE_ITEM_DATA,
      payload: api.getCompareItemsData(product),
    });
    dispatch(actionCreators.track({
      eventName: 'AddTo Compare', params: product,
    }));
  },
  removeCompareData: id => ({
    type: actions.CRUD_COMPARE,
    payload: api.removeCompareData(id),
  }),
  removeCompareItem: id => ({
    type: actions.REMOVE_COMPARE_ITEM,
    payload: api.removeCompareData(id),
  }),
  track: params => (dispatch, getState) => {
    const state = getState();
    params.postResult = state.cartReducer.data.items;
    return {
      type: actions.COMPARE_TRACK,
      payload: api.track(params),
    };
  },
};

export { actions, actionCreators };
