import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { toast } from 'react-toastify';
import { languageDefinations } from '../../utils/lang/';
// import { actionCreators } from './actions';
const { API_TEXT } = languageDefinations();

const cookies = new Cookies();

const getUserInfo = ({initiateEmailVerification}) => {
  return axios.post(`${constants.CMS_API_URL}/api/v1/user/info?initiateEmailVerification=${initiateEmailVerification}`);
}

const userLogin = (params) => {
  return axios.post(`/api/login`, Object.assign({}, params, {
    authVersion: 'V1',
    tenant: 'CUSTOMER',
    type: 'RT',
    client_type: 'WEB'
  })).then(({data, status}) => {
    // cart merge
    if(status === 200) {
      const { username } = params.metadata;
      const PTA_PARAMS = {
        'p_userid': username,
        'p_email.addr': username,
        'p_ccf_14': 7,
        'p_ccf_15': 9
      };
      axios.put(`${constants.CART_API_URL}/api/v1/cart/merge`);
      let inputString = '';
      for(let key in PTA_PARAMS){
        inputString = inputString ? `${inputString}&${encodeURI(key)}=${encodeURI(PTA_PARAMS[key])}` : `${encodeURI(key)}=${encodeURI(PTA_PARAMS[key])}`
      }
      return axios.post(`${constants.AUTH_API_URL}/api/v1/encrypt/`,
        {
          input: inputString
        }
      ).then((ptaData) => {
        let { output } = ptaData.data;
        const strlen = output.length
        for (let i = 0; i < strlen; i++) {
          output = output.replace('+', '_').replace('/', '~').replace('=', '*');
        }
        data.data.ptaToken = output;
        return data;
      });
    }
  })
  // .catch((err) => {
  //   err.response && alert(err.response.data.data.error.message);
  //   throw err;
  // });
};

const userLogout = () => {
  axios.post('/api/logout');
};

const getLoginInfo = () => {
  const userCreds = cookies.get('userCreds');
  return {
    userCreds: userCreds || null,
    isLoggedIn: !!cookies.get('auth') && (cookies.get('isVerified') === 'true'),
    ...(!cookies.get('auth') && { instagramCode: window.localStorage.getItem('instagramCode') || null }),
  };
};

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
  }).then(() => {
    return language;
  });
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
const verifyEmail = (body) => {
  return axios.put(`${constants.CMS_API_URL}/api/v1/verification/email/otp`, body).then(({ data }) => {
    toast.success(API_TEXT.YOUR_EMAIL_IS_VERIFIED);
    return { data };
  });
};

const sendOtpToEmailId = (showToast) => {
  return axios.post(`${constants.CMS_API_URL}/api/v1/verification/email`).then(({ data }) => {
    if (showToast ? toast.success(API_TEXT.OTP_SENT_TO_YOUR_MAIL_ID) : '');
    return { data };
  });
};

const setVerfied = (isVerified) => {
  return axios.post('/api/setCookie', {
    data: {
      isVerified,
    },
  }).then(() => isVerified);
}

export default { userLogin, userLogout, getLoginInfo, setCountry, setSessionID, deriveCity, autoCompleteCity, setCity, removeCity, setLanguage, savePtaToken, verifyEmail, sendOtpToEmailId, getUserInfo, setVerfied };
