import shajs from 'sha.js';
import fp, * as _ from 'lodash/fp';
import axios from 'axios';
import getConfig from 'next/config'
import apm from './apmInstance';
import constants from './constants';
import { pimServiceInstance } from './services';
import Cookie from 'universal-cookie';

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
  return auth ? auth.access_token : undefined;
}

export const country = () => {
  return cookies.get('country');
}

const getServiceName = (url) => {
  return Object.keys(constants)[_.findIndex((serviceUrl) => {
    return url.includes(serviceUrl);
  }, Object.values(constants))];
}

const apmReqInterceptor = (config) => {
  const serviceName = getServiceName(config.url);
  if(env === 'local') return config;
  config.transaction = apm.startTransaction(`${serviceName} Service`, 'custom')
  config.httpSpan = config.transaction ? config.transaction.startSpan(`FETCH ${JSON.stringify(config)}`, 'http') : null;
  return config;
}

const apmResInterceptor = (response) => {
  const serviceName = getServiceName(response.config.url);
  if (env === 'local') return response;
  const { httpSpan, transaction } = response.config;
  httpSpan && httpSpan.end();
  transaction && transaction.end();
  return response;
}

const errorInterceptor = (err) => {
  try {
    if(env !== 'local') {
      apm.setCustomContext({
        response: {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers,
        },
        request: {
          url: err.config.url,
          headers: err.config.headers,
        }
      });
      apm.captureError(err)
    }
    if (err.response && err.response.status == '401') {
      const { refresh_token } =  cookies.get('auth') || {};
      if(refresh_token) {
        return axios.post(`/api/refresh`, {
          'auth_version': 'V1',
          'refresh_token': refresh_token
        }).then((res) => {
          return axios(err.config);
        }).catch((err) => {
          alert('You are logged out, Login and try again');
          location.reload();
        });
      } else {
        cookies.remove('auth');
      }
    }
  } catch (e) {
    console.log(e);
  }
  return Promise.reject(err);
}

axios.interceptors.request.use(_.compose(apmReqInterceptor, configModifer));
axios.interceptors.response.use(_.compose(apmResInterceptor), _.compose(errorInterceptor));

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
    };
    return copyConfig;
  }
));

export default {};
