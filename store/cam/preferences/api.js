import axios from 'axios';
import constants from '../../helper/constants';

const getNotificationPreferences = () =>
  axios.get(`${constants.CMS_API_URL}/api/v1/user/settings/NOTIFICATION`);

export default { getNotificationPreferences };
