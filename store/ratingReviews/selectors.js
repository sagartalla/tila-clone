import _ from 'lodash';
import shortid from 'shortid';

const getUserReviews = store => store.reviewRatingReducer.data.userReviews;

const isLoading = (store) => {
  return store.reviewRatingReducer.ui.loading;
}

export { getUserReviews, isLoading };
