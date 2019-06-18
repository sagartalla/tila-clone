import shajs from 'sha.js';
import fp, * as _ from 'lodash/fp';
import axios from 'axios';
import getConfig from 'next/config'
// import apm from './apmInstance';
import constants from './constants';
import { pimServiceInstance } from './services';
import Cookie from 'universal-cookie';
import { toast } from 'react-toastify';
import ToastContent from '../../components/common/ToastContent';
import Sentry from '../../utils/sentryUtil';

const config = getConfig()
const env = config.publicRuntimeConfig.env;
const cookies = new Cookie();

const configModifer = (config) => {
  //SF-89
  const tempHeaders = (/vault/.test(config.url))  ?  {"x-auth-tenant-key": "1275edea-cf49-4adb-ad0d-4e9b255f893f" ,"x-auth-tenant-secret": "VTQVTO9QJW2DTINOD1AE" ,'x-auth-ip': '196.128.1.1'} : {}
  const newheaders = _.reduce.convert({ 'cap': false })((acc, value, key) => {
    if(value) {
      acc[key] = value;
    }
    return acc;
  }, {}, { "x-country-code": country(), "x-session-id": sessionId(), "x-access-token": authToken(), "x-language": cookies.get('language'), ...tempHeaders });
  return {
    ...config,
    headers: {
      ...config.headers,
      ...newheaders
    }
  };
}

//TODO SF-49
export const sessionId = () => {
  return cookies.get('sessionId');
}

export const authToken = () => {
  const auth =  cookies.get('auth');
  return auth ? auth.access_token : '';
}

export const country = () => {
  return cookies.get('country');
}

const getServiceName = (url) => {
  return Object.keys(constants)[_.findIndex((serviceUrl) => {
    return url.includes(serviceUrl);
  }, Object.values(constants))];
}

const notifySentry = (err) => {
  Sentry.configureScope((scope) => {
      scope.setTag(`api`, true);
      scope.setExtra(`url`, err.config.url);
      scope.setExtra(`reqData`, err.config.data);
      scope.setExtra(`resData`, err.response.data);
      scope.setExtra(`statusCode`, err.response.status);
      scope.setExtra(`reqHeaders`, err.config.headers);
      scope.setExtra(`resHeaders`, err.response.headers);
      if (req.user) {
        scope.setUser({ id: req.user.id, email: req.user.email });
      }
  });
  Sentry.captureException(err);
};

const errorInterceptor = (err) => {
  try {
    if (err.response && err.response.status && err.response.status == '401') {
        const { refresh_token } =  cookies.get('auth') || {};
        if(refresh_token) {
          return axios.post(`/api/refresh`, {
            'auth_version': 'V1',
            'refresh_token': refresh_token
          }).then((res) => {
            return axios(err.config);
          }).catch((err) => {
            location.reload();
          });
        } else {
          cookies.remove('auth');
        }
    } else {
      if (err.response.status === '403') {
        cookies.remove('auth');
      }
      toast(
        <ToastContent
          msg={err.response.data.message || err.response.data.data.error.message}
          msgType='error'
        />
      )
      notifySentry(err);
    }
  } catch (e) {
    console.log(e);
  }
  return Promise.reject(err);
}

axios.interceptors.request.use(_.compose(configModifer));
axios.interceptors.response.use(null, _.compose(errorInterceptor));

pimServiceInstance.interceptors.request.use(_.compose(
  (config) => {
    const tenantId = '5ab0f832a206e8419416f74f';
    const key = 'lcjkxcjzlxcko45';
    const requestId = (`${Math.random()} `).substring(2, 10) + (`${Math.random()} `).substring(2, 10);
    const copyConfig = Object.assign({}, config);
    const stringifiedData = JSON.stringify(config.data) || '';
    copyConfig.headers = {
      tenantId,
      'Request-Id': requestId,
      Hash: shajs('sha256').update(`${key}${stringifiedData}${requestId}`).digest('hex'),
      'x-access-token': config.accessToken,
    };
    return copyConfig;
  }
));

export default {};
