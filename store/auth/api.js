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

const getUserInfo = ({ initiateEmailVerification }) => axios.post(`${constants.CMS_API_URL}/api/v1/user/info?initiateEmailVerification=${initiateEmailVerification}`);

const track = (event, status) => {
  window.appEventData.push({
    event,
    login:
      {
        loginInfo: {
          pageName: 'login',
          pageType: 'login',
          error: status,
        },
      },
  });
};

const userLogin = params =>
  axios.post('/api/login', Object.assign({}, params, {
    authVersion: 'V1',
    tenant: 'CUSTOMER',
    type: 'RT',
    client_type: 'WEB',
  })).then(({ data, status }) => {
    // cart merge
    if (status === 200) {
      const { username } = params.metadata;
      if (params.channel === 'BASIC_REGISTER') {
        track('SignUp', 'Success');
        window.dataLayer.push({ event: 'SignUp' });
      } else {
        track('SignIn', 'Success');
      }
      const PTA_PARAMS = {
        p_userid: username,
        'p_email.addr': username,
        p_ccf_14: 7,
        p_ccf_15: 9,
      };
      axios.post('/api/setCookie', {
        data: {
          auth:cookies.get('auth')
        }
      })
      axios.put(`${constants.CART_API_URL}/api/v1/cart/merge`);
      let inputString = '';
      for (const key in PTA_PARAMS) {
        inputString = inputString ? `${inputString}&${encodeURI(key)}=${encodeURI(PTA_PARAMS[key])}` : `${encodeURI(key)}=${encodeURI(PTA_PARAMS[key])}`;
      }
      return axios.post(
        `${constants.AUTH_API_URL}/api/v1/encrypt/`,
        {
          input: inputString,
        },
      ).then((ptaData) => {
        let { output } = ptaData.data;
        const strlen = output.length;
        for (let i = 0; i < strlen; i += 1) {
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
;

const userLogout = () => {
  axios.post('/api/logout')
  .then((res) => {
    if (res.status === 200) {
      window.location = `${window.location.origin}/${cookies.get('country')}/${cookies.get('language')}`;
    }
  });
};

const getLoginInfo = () => {
  const userCreds = cookies.get('userCreds');
  return {
    userCreds: userCreds || null,
    isLoggedIn: !!cookies.get('auth') && (cookies.get('isVerified') === 'true'),
    ...(!cookies.get('auth') && { instagramCode: window.localStorage.getItem('instagramCode') || null }),
    isVerified: cookies.get('isVerified') === 'true',
  };
};

const setCountry = country => axios.post('/api/setCookie', {
  data: {
    country,
  },
}).then(() => country);

const setSessionID = sessionId => axios.post('/api/setCookie', {
  data: {
    sessionId,
  },
  options: {
    expires: moment().add(3, 'months').format(),
  },
}).then(() => sessionId);

const deriveCity = params => axios.get(`/api/googleApi?api=${params.api}&latitude=${params.latitude}&longitude=${params.longitude}`).then(({ data }) => data);

const setCity = params => axios.post('/api/setCookie', {
  data: {
    shippingInfo: {
      ...params,
    },
  },
}).then(() => params);

const setLanguage = language => axios.post('/api/setCookie', {
  data: {
    language,
  },
}).then(() => language);

const removeCity = () => {
  const shippingInfo = cookies.get('shippingInfo') || {};
  return axios.post('/api/setCookie', {
    data: {
      shippingInfo: {
        country: shippingInfo.country,
      }
    }
  });
};

const savePtaToken = ptaToken => axios.post('/api/setCookie', {
  data: {
    ptaToken,
  },
}).then(() => ptaToken);
const verifyEmail = body => axios.put(`${constants.CMS_API_URL}/api/v1/verification/email/otp`, body).then(({ data }) => {
  toast.success(API_TEXT.YOUR_EMAIL_IS_VERIFIED);
  return { data };
});

const sendOtpToEmailId = showToast => axios.post(`${constants.CMS_API_URL}/api/v1/verification/email`).then(({ data }) => {
  if (showToast ? toast.success(API_TEXT.OTP_SENT_TO_YOUR_MAIL_ID) : '');
  return { data };
});

const setVerfied = isVerified => axios.post('/api/setCookie', {
  data: {
    isVerified,
  },
}).then(() => isVerified);

const getDomainCountries = () => axios.get(`${constants.TRANSFORMER_API_URL}/fpts/domainCurrencyMapping`);


// New Registration Flow API's

const v2UserLogin = email => axios.get(`${constants.CMS_API_URL}/api/v1/user?email=${email}`).then(res => Object.assign({}, res, {
  data: {
    ...res.data,
    email,
  },
}));

const showUserInfo = (param) => {
  return axios.get(`${constants.CMS_API_URL}/api/v1/user/password/forgot?email=${param}`);
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



export default {
  userLogin, userLogout, getLoginInfo, setCountry, setSessionID, deriveCity, setCity, getDomainCountries,
  removeCity, setLanguage, savePtaToken, verifyEmail, sendOtpToEmailId, getUserInfo, setVerfied, track,
  v2UserLogin, resetPassword, forgotPassword,
};
