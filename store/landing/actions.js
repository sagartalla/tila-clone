import api from './api';

const actions = {
  GET_PAGES: 'GET_PAGES',
};

const actionCreators = {
  getPages: (params) => {
    return ({
      type: actions.GET_PAGES,
      payload: api.getPages(params),
    })
  }
};

export { actions, actionCreators };
