import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

// const getReviewsRatings = (params) => axios.post(`${constants.REVIEWS_API_URL}/api/v1/reviews/`, {...params})

const getMyReviews = () => axios.get(`${constants.REVIEWS_API_URL}/api/v1/reviews/my`);

const deleteReview = id => axios.put(`${constants.REVIEWS_API_URL}/api/v1/reviews/delete/${id}`).then(() => id);

export default { getMyReviews, deleteReview };
