import axios from 'axios';
import constants from '../../helper/constants';

const getNotificationsApi = () => {
  return axios.get(`${constants.FCM_API_URL}/api/v1/notifications`).then(({ data }) => {
    return { data };
  });
};

export default { getNotificationsApi };
