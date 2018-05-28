import _ from 'lodash';
import { authServiceInstance, camServiceInstance } from '../helper/services';

const userLogin = (params) => {
  return authServiceInstance.post(`/api/v1/login/basic`, Object.assign({}, params, {
    type: 'CUSTOMER',
    authVersion: 'V1'
  })).then(({data, status}) => {
    let isLoggedIn = false;
    if(status === 200) {
      localStorage.setItem('userCreds', JSON.stringify(params));
      localStorage.setItem('auth', JSON.stringify(data));
      isLoggedIn = true;
    } else {
      localStorage.removeItem('auth');
      isLoggedIn = false;
    }
    return { 
        data: {
          isLoggedIn,
        }
      }
  });
}

const userRegister = (params) =>  camServiceInstance.post('/api/v1/user/register', params);

const userLogout = () => {
  localStorage.removeItem('auth');
}

const getLoginInfo = () => {
  return {
    userCreds: JSON.parse(localStorage.getItem('userCreds') || '{}'),
    isLoggedIn: !!localStorage.getItem('auth') 
  };
} 

export default { userLogin, userRegister, userLogout, getLoginInfo };