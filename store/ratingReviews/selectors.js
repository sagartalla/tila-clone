import _ from 'lodash';
import shortid from 'shortid';

const getReviewsRatings = (store) => {

  let { userReviews } = store.reviewRatingReducer.data;

  return userReviews.map((obj) => ({
    reviewerName: obj['reviewer_name'],
    rating: obj['ratings'],
    certifiedBuyer: obj['certified_buyer'],
    date: 'no date time',
    comment: obj['comment'],
    likes: obj['relevance_count'],
    dislikes: obj['irrelavance_count'],
    uniqId: shortid.generate(),
  }));
};

const isLoading = (store) => {
  return store.reviewRatingReducer.ui.loading;
}

export { getReviewsRatings, isLoading };
