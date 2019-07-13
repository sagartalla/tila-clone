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
  },
  track: params => (dispatch, getState) => {
    console.log(params);
    const state = getState();
    params.postResult = state.wishlistReducer.products;
    return {
      type: actions.MEGAMENU_TRACK,
      payload: apis.track(params),
    };
  },

};

export { actions, actionCreators };

