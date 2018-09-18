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
      const { username } = params;
      const PTA_PARAMS = {
        'p_userid': username,
        'p_email.addr': username,
        'p_ccf_14': 7,
        'p_ccf_15': 9
      };
      axios.put(`${constants.CART_API_URL}/api/v1/cart/merge`);
      return axios.post(`${constants.AUTH_API_URL}/api/v1/encrypt/`,
        {
          input: _.reduce(PTA_PARAMS, (acc, val, key) => {
            return `${acc}&${encodeURI(key)}=${encodeURI(val)}`;
          }, '')
        }
      ).then((ptaData) => {
        const { output } = ptaData.data;
        data.data.ptaToken = output.replace('+', '_').replace('/','~').replace('=','*');
        return data;
      });
    }
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

const autoCompleteCity = (params) => {
    return axios.get(`/api/autoCompleteCity?api=${'/place/autocomplete/json'}&input=${params.input}`).then(({data}) => data);
}

const setCity = (params) => {
  return axios.post('/api/setCookie', {
    data: {
      shippingInfo: {
        ...params
      }
    }
  }).then(() => params);
}

const setLanguage = (language) => {
  return axios.post('/api/setCookie', {
    data: {
      language,
    }
  }).then(() => language);
}

const removeCity = () => {
  return axios.post('/api/deleteCookie', {
    keys: ['shippingInfo']
  });
}

const savePtaToken = (ptaToken) => {
  return axios.post('/api/setCookie', {
    data: {
      ptaToken,
    }
  }).then(() => ptaToken);
}

export default { userLogin, userRegister, userLogout, getLoginInfo, setCountry, setSessionID, deriveCity, autoCompleteCity, setCity, removeCity, setLanguage, savePtaToken, savePtaToken };
