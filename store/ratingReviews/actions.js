import api from './api';
import _ from 'lodash';

const actions = {};

const actionCreators = {
  getRatingsAndReviews: ()  =>  (dispatch, getState) => {
    const store = getState();
    const { productReducer } = store;
    const productDetails = _.get(store, productReducer.data[0].product_details, {})
    const { catalog_details: catalogDetails,  product_id} = productDetails
    const options = {
      catalog_id: catalogDetails.catalog_id,
      item_type: catalogDetails.item_type_name,
      most_recent: true,
      most_relevant: true,
      page_no: 0,
      product_id,
    }

    return dispatch({
      type: actions.GET_PRODUCT,
      payload: api.getReviewsRatings(options),
    })
  }
};

export { actions, actionCreators };
