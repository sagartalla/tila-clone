import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastContent from '../../components/common/ToastContent'
import constants from '../helper/constants';

// const getReviewsRatings = (params) => axios.post(`${constants.REVIEWS_API_URL}/api/v1/reviews/`, {...params})

const getMyReviews = () => axios.get(`${constants.REVIEWS_API_URL}/api/v1/reviews/my`);

const deleteReview = id => axios.put(`${constants.REVIEWS_API_URL}/api/v1/reviews/delete/${id}`).then(() => {
  toast(
    <ToastContent
      msg='Review Deleted Successfully!'
      msgType='success'
    />
  )
  return id;
});

export default { getMyReviews, deleteReview };
