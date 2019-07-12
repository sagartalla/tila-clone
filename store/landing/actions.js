import api from './api';

const actions = {
  GET_PAGE: 'GET_PAGE',
  GET_LISTINGS_DETAILS: 'GET_LISTINGS_DETAILS',
};

const actionCreators = {
  getPage: params => ({
    type: actions.GET_PAGE,
    payload: api.getPage(params),
  }),
  getListings: params => ({
    type: actions.GET_LISTINGS_DETAILS,
    payload: api.getListings(params),
  }),
};

export { actions, actionCreators };
