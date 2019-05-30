import api from './api';
// import _ from 'lodash';

const actions = {
  GET_MY_REVIEWS: 'GET_MY_REVIEWS',
  DELETE_MY_REVIEW: 'DELETE_MY_REVIEW',
};

const actionCreators = {
  getMyReviews: () => ({
    type: actions.GET_MY_REVIEWS,
    payload: api.getMyReviews(),
  }),
  deleteReview: id => ({
    type: actions.DELETE_MY_REVIEW,
    payload: api.deleteReview(id),
  }),
};

export { actions, actionCreators };
