import api from './api';
import loginReq from '../helper/loginReq';

const actions = {
  GET_PAGE: 'GET_PAGE',
  GET_LISTINGS_DETAILS: 'GET_LISTINGS_DETAILS',
  GET_ALL_ZONE_ITEMS: 'GET_ALL_ZONE_ITEMS',
};

const actionCreators = {
  getPage: params => ({
    type: actions.GET_PAGE,
    payload: api.getPage(params),
  }),
  getListings: (params, index) => ({
    type: actions.GET_LISTINGS_DETAILS,
    payload: api.getListings(params, index),
  }),
  getRecentlyViewedAll: loginReq(() => (dispatch) => {
    dispatch({
      type: actions.GET_ALL_ZONE_ITEMS,
      payload: api.getRecentlyViewedAll(),
    });
  }),
};

export { actions, actionCreators };
