import _ from 'lodash';

const getReviewsRatings = (store) => {
  return store.reviewRatingReducer.data.userReviews;
};

const isLoading = (store) => {
  return store.reviewRatingReducer.ui.loading;
}

export { getReviewsRatings, isLoading };
