import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getReviewsRatings = (params) => axios.post('/api/v1/reviews/', {...params}, {'x-country-code': 'ksa'})

export default { getReviewsRatings };
