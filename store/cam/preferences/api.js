import axios from 'axios';
import constants from '../../helper/constants';

const getNotificationPreferences = () =>
  axios.get(`${constants.CMS_API_URL}/api/v1/user/settings/NOTIFICATION`);

const postPreferences = preference =>
  axios.post(`${constants.CMS_API_URL}/api/v1/user/settings`, preference).then(() => preference);

export default { getNotificationPreferences, postPreferences };
