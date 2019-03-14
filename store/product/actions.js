import api from './api';

const actions = {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_PREVIEW: 'GET_PREVIEW',
  GET_REVIEW_RATINGS: 'GET_REVIEW_RATINGS',
  SUBMIT_USER_REVIEW: 'SUBMIT_USER_REVIEW',
  SET_SELECTED_VARIANT: 'SET_SELECTED_VARIANT'
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
  })
};

export { actions, actionCreators };
