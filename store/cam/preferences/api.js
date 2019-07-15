import axios from 'axios';
import { toast } from 'react-toastify';
import constants from '../../helper/constants';
import ToastContent from '../../../components/common/ToastContent';
const getNotificationPreferences = () =>
  axios.get(`${constants.CMS_API_URL}/api/v1/user/settings/NOTIFICATION`);

const postPreferences = preference =>
  axios.post(`${constants.CMS_API_URL}/api/v1/user/settings`, preference).then(() => {
    toast(
      <ToastContent
        msg='Preferences Saved Successfully'
        msgType='success'
      />
    )
    return preference;
  });

export default { getNotificationPreferences, postPreferences };
