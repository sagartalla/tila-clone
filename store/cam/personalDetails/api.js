import { camServiceInstance } from '../../helper/services';

const getUserProfileInfo = () => {
  return Promise.all([
    camServiceInstance.get('/api/v1/user/account/details'),
    camServiceInstance.post('/api/v1/user/info')
  ]).then(([data1, data2]) => {
    return {
      personalInfo: data1.data,
      contactInfo: data2.data
    }
  })
};

const changePassword = (body) => {
  return camServiceInstance.put('/api/v1/user/password/set', body).then(({ data }) => {
    return { data };
  })
};

const editPersonalInfo = (body) => {
  return camServiceInstance.put('/api/v1/user/account/edit', body).then(({ data }) => {
    return camServiceInstance.get('/api/v1/user/account/details').then(userInfoResult=> [data,userInfoResult]);
  }).then(([personalInfoStatus, userInfoResult]) =>{
    return {
      personalInfo:userInfoResult.data,
      personalInfoStatus}
  });
}



export default { getUserProfileInfo, changePassword , editPersonalInfo};
