import api from './api';

const actions = {
  GET_PAGE: 'GET_PAGE',
};

const actionCreators = {
  getPage: (params) => {
    return ({
      type: actions.GET_PAGE,
      payload: api.getPage(params),
    })
  }
};

export { actions, actionCreators };
