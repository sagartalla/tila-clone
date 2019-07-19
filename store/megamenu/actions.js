import apis from './api';

const actions = {
  GET_MEGAMENU: 'GET_MEGAMENU'
};

const actionCreators = {
  getMegamenu: (params) => {
    return {
      type: actions.GET_MEGAMENU,
      payload: apis.getMegamenu()
    }
  }
};

export { actions, actionCreators };

