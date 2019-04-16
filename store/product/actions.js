import api from './api';

const actions = {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_PREVIEW: 'GET_PREVIEW',
  GET_REVIEW_RATINGS: 'GET_REVIEW_RATINGS',
  SUBMIT_USER_REVIEW: 'SUBMIT_USER_REVIEW',
  SET_SELECTED_VARIANT: 'SET_SELECTED_VARIANT',
  SET_SELECTED_PRODUCT_DATA: 'SET_SELECTED_PRODUCT_DATA',
  GET_CITIES: 'GET_CITIES',
  AUTOCOMPLETE_CITY: 'AUTOCOMPLETE_CITY',
};

const actionCreators = {
  getProduct: (params) => {
    return ({
      type: actions.GET_PRODUCT,
      payload: api.getProduct(params),
    })
  },
  getPreview: (params) => {
    return ({
      type: actions.GET_PREVIEW,
      payload: api.getPreview(params),
    })
  },
  getRatingsAndReviews:(params) => {
    return ({
      type:actions.GET_REVIEW_RATINGS,
      payload:api.getReviewRatings(params)
    })
  },
  submitUserReview:(params) => {
    return ({
      type:actions.SUBMIT_USER_REVIEW,
      payload:api.submitUserReview(params)
    })
  },
  setSelectedVariant: (params) => ({
    type:actions.SET_SELECTED_VARIANT,
    payload:api.setSelectedVariant(params)
  }),
  setSelectedProductData: (params) => ({
    type: actions.SET_SELECTED_PRODUCT_DATA,
    payload:params
  }),
  track: (params) => (dispatch, getState) => {
    const state = getState();
    params.postResult = state.cartReducer.data.items;
    return {
      type: actions.CART_TRACK,
      payload: api.track(params)
    };
  },
  getCitiesByCountryCode: (code) => {
    return ({
      type: actions.GET_CITIES,
      payload: api.getCities(code),
    });
  },

  autoCompleteCity: (searchKeyWord) => {
    return ({
      type: actions.AUTOCOMPLETE_CITY,
      searchKeyWord,
    });
  },
};

export { actions, actionCreators };
