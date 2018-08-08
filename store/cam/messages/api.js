import axios from 'axios';
import constants from '../../helper/constants';

const getMessagesApi = () => {
  return axios.get(`${constants.FCM_API_URL}/api/v1/messages`).then(({ data }) => {
    return { data };
  });
};

export default { getMessagesApi };
