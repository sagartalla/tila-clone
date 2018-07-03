import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getReviewsRatings = (params) => axios.post(`${constants.REVIEWS_API_URL}/api/v1/reviews/`, {...params})

export default { getReviewsRatings };
