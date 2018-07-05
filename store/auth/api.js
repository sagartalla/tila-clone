import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';
import Cookies from 'universal-cookie';
import moment from 'moment';

const cookies = new Cookies();

const userLogin = (params) => {
  return axios.post(`/api/login`, Object.assign({}, params, {
    type: 'CUSTOMER',
    authVersion: 'V1'
  })).then(({data, status}) => {
    // cart merge
    if(status === 200) {
      axios.put(`${constants.CART_API_URL}/api/v1/cart/merge`);
    }
    return data;
  });
}

const userRegister = (params) => axios.post(`${constants.CMS_API_URL}/api/v1/user/register`, params);

const userLogout = () => {
  axios.post('/api/logout');
}

const getLoginInfo = () => {
  const userCreds = cookies.get('userCreds');
  return {
    userCreds: userCreds ? userCreds.username : '',
    isLoggedIn: !!cookies.get('auth'),
  };
}

const setCountry = (country) => {
  return axios.post('/api/setCookie', {
    data: {
      country,
    }
  }).then(() => country);
}

const setSessionID = (sessionId) => {
  return axios.post('/api/setCookie', {
    data: {
      sessionId,
    },
    options: {
      expires: moment().add(3, 'months').format()
    },
  }).then(() => sessionId);
}

const deriveCity = (params) => {
  return axios.get(`/api/googleApi?api=${params.api}&latitude=${params.latitude}&longitude=${params.longitude}`).then(({data}) => data);
}

export default { userLogin, userRegister, userLogout, getLoginInfo, setCountry, setSessionID, deriveCity };
