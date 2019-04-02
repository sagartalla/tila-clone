import axios from 'axios';
import constants from '../../helper/constants';
import { toast } from 'react-toastify';

const getUserProfileInfo = () => {
  return Promise.all([
    axios.get(`${constants.CMS_API_URL}/api/v1/user/account/details`),
    axios.post(`${constants.CMS_API_URL}/api/v1/user/info`)
  ]).then(([data1, data2]) => {
    return {
      personalInfo: data1.data,
      contactInfo: data2.data
    }
  })
};

const uploadProfilePic = (body) => {
  return axios.request({
    method: 'POST',
    url: 'https://api-gateway-stage.fptechscience.com/transformers/fpts/document-service/upload',
    data: body,
    headers: {
      'tenant': 'profile-service',
    },
  }).then(({data}) => {
    toast.success('Your Profile Pic is successfully uploaded');
    return data;
  }).catch((data) => {
    console.log(data);
  })
}

const getProfilePic = (body) => {
  return axios.request({
    method: 'GET',
    url: `${'https://api-gateway-stage.fptechscience.com/transformers/fpts/document-service/download/'}${body}`,
    headers: {
      'tenant': 'profile-service',
    },
  }).then(({data}) => {
    return data;
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
      personalInfoStatus}
  });
}

const deactivateUserProfile = () =>
  axios.put(`${constants.CMS_API_URL}/api/v1/user/deactivate/`);

export default {
  getUserProfileInfo, getProfilePic, changePassword, uploadProfilePic, forgotPassword, editPersonalInfo,
  deactivateUserProfile, resetPassword, otpUserUpdate, verifyOtp,sendOtpToMobile
};
