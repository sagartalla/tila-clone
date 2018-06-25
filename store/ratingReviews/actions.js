import api from './api';
import _ from 'lodash';

const actions = {
  GET_REVIEW_RATING: 'GET_REVIEW_RATING'
};

const actionCreators = {
  getRatingsAndReviews: (params = {})  =>  (dispatch, getState) => {
    const store = getState();
    const { productReducer } = store;
    const productDetails = _.get(store, 'productReducer.data[0].product_details', {});
    const { catalog_details: catalogDetails,  product_id: productId} = productDetails;
    const options = {
      catalog_id: catalogDetails ? catalogDetails.catalog_id : params.catalogId,
      item_type: catalogDetails ? catalogDetails.item_type_name : params.itemType,
      most_recent: params.mostRecent || true,
      most_relevant: params.mostRelevant || true,
      page_no: 0,
      product_id: productId || params.productId,
      ratings: params.ratings || undefined
    };

    return dispatch({
      type: actions.GET_REVIEW_RATING,
      payload: api.getReviewsRatings(options),
    })
  }
};

export { actions, actionCreators };
