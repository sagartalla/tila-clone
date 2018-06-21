import _ from 'lodash';
import shortid from 'shortid';

const getReviewsRatings = (store) => {

  let { userReviews } = store.reviewRatingReducer.data;
  userReviews = userReviews.length ? userReview : [{
    "user_acct_id": 0,
    "catalog_id": "CMOBPQTQHPPL1MPEJB",
    "product_id": null,
    "variant_id": null,
    "ratings": 1,
    "relevance_count": 0,
    "irrelavance_count": 0,
    "created_at": null,
    "updated_at": null,
    "review_id": 6,
    "comment": "TEST COMMENT",
    "reviewer_name": "test reviewer",
    "certified_buyer": false
  }];

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
