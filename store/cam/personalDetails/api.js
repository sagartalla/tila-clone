import axios from 'axios';
import { toast } from 'react-toastify';
import ToastContent from '../../../components/common/ToastContent';
import constants from '../../helper/constants';
import { languageDefinations } from '../../../utils/lang/';
import generateURL from '../../../utils/urlGenerator';

const { PERSONAL_INFO_MODAL, API_TEXT } = languageDefinations();

const getUserProfileInfo = () => {
  return Promise.all([
    axios.get(`${constants.CMS_API_URL}/api/v1/user/account/details`),
    axios.post(`${constants.CMS_API_URL}/api/v1/user/info?includeSocialAccounts=${true}`)
  ]).then(([data1, data2]) => {
    return {
      personalInfo: data1.data,
      contactInfo: data2.data
    }
  })
};

const downloadPic = (imageId) => {
  return generateURL(imageId).then((data)=>{
    return data;
  })
}

const uploadProfilePic = (body) => {
  return axios.request({
    method: 'POST',
    url: `${constants.TRANSFORMER_API_URL}/fpts/document-service/upload`,
    data: body,
    headers: {
      'tenant': 'profile-service',
    },
  }).then(({data}) => {
    toast(
      <ToastContent
        msg={PERSONAL_INFO_MODAL.IMAGE_UPDATED_SUCCESS}
        msgType='success'
      />
    )
    return data;
  }).catch((data) => {
    console.log(data);
  })
}

const changePassword = (body) => {
  return axios.put(`${constants.CMS_API_URL}/api/v1/user/password/set`, body).then(({ data }) => {
    return { data };
  })
};

const resetPassword = (body) => {
  return axios.post(`${constants.CMS_API_URL}/api/v1/user/password/reset`, body).then((data) => {
    return data;
  }).catch((error) => {
    return error.response.data;
  })
}

const forgotPassword = (body) => {
  return axios.post(`${constants.CMS_API_URL}/api/v1/user/password/forgot`, body).then(({data}) => {
    toast.success(API_TEXT.OTP_SENT_TO_YOUR_MAIL_ID)
    return data;
  }).catch((error) => {
    return error.response.data;
  });
}

const otpUserUpdate = async(params) => {
  try {
    const update = await axios.put(`${constants.CMS_API_URL}/api/v1/user/update`,params)
    const otpResponse = await sendOtpToMobile()

    return update
  }catch(error) {
    return error.response.data
  }
}
const sendOtpToMobile = async() => {
  const response =  await axios.post(`${constants.CMS_API_URL}/api/v1/verification/mobile`)
  return response
}
const verifyOtp = (params) => {
  return axios.put(`${constants.CMS_API_URL}/api/v1/verification/mobile/otp`,params)
}
const editPersonalInfo = (body) => {
  return axios.put(`${constants.CMS_API_URL}/api/v1/user/account/edit`, body).then(({ data }) => {
    return axios.get(`${constants.CMS_API_URL}/api/v1/user/account/details`).then(userInfoResult=> [data,userInfoResult]);
  }).then(([personalInfoStatus, userInfoResult]) =>{
    return {
      personalInfo:userInfoResult.data,
      personalInfoStatus
    }
  });
}

const deactivateUserProfile = () =>
  axios.put(`${constants.CMS_API_URL}/api/v1/user/deactivate/`);

export default {
  getUserProfileInfo, changePassword, uploadProfilePic, forgotPassword, editPersonalInfo,
  deactivateUserProfile, resetPassword, otpUserUpdate, verifyOtp,sendOtpToMobile, downloadPic
};
