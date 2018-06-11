import apis from './api';

const actions = {
  GET_WISHLIST: 'GET_WISHLIST',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
};

const actionCreators = {
  getWishlist: () => (dispatch, getState) => {
    return dispatch({
      type: actions.GET_WISHLIST,
      payload: apis.getWishlistApi(),
    });
  },
  addToWishlist: (params) => (dispatch, getState) => {
    return dispatch({
      type: actions.ADD_TO_WISHLIST,
      payload: apis.addToWishlistApi(params),
    });
  }
};

export { actions, actionCreators };

