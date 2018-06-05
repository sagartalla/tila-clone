import apis from './api';

const actions = {
  GET_WISHLIST: 'GET_WISHLIST'
};

const actionCreators = {
  getWishlist: () => (dispatch, getState) => {
    return dispatch({
      type: actions.GET_WISHLIST,
      payload: apis.getWishlistApi(),
    });
  }
};

export { actions, actionCreators };

