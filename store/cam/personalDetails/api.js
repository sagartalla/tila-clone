import axios from 'axios';
import constants from '../../helper/constants';

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
  getUserProfileInfo, changePassword, forgotPassword, editPersonalInfo, deactivateUserProfile, resetPassword,
};
