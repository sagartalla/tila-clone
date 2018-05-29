import shajs from 'sha.js';
import { init as initApm } from 'elastic-apm-js-base';
import fp, * as _ from 'lodash/fp';
import axios from 'axios';
import getConfig from 'next/config'
const config = getConfig()
const env = config.publicRuntimeConfig.env;

import {
  searchServiceInstance,
  listingServiceInstance,
  addressServiceInstance,
  pimServiceInstance,
  catalogServiceInstance,
  authServiceInstance,
  paymentServiceInstance,
  transacationRedirectUrlInstance,
  orderServiceInstance,
  cartServiceInstance,
  camServiceInstance
} from './services';

import apmConfig from '../../apm.config';
import constants from './constants';

const apm = initApm({
  serviceName: apmConfig.serviceName,
  serverUrl: apmConfig.serverUrl,
});

const configModifer = () => (config) => {
  config.headers = { "x-country-code": country(), "x-session-id": sessionId(), "x-access-token": authToken(), "x-language": 'en' };
  return config;
}

// Generate UUID/random number
// Code taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const sessionId = () => {
  try {
    if (localStorage) {
      const id = localStorage.session_id;
      if (id) {
        return id;
      } else {
        const uuid = uuidv4();
        localStorage.setItem('session_id', uuid);
        return uuid;
      }
    } else {
      return uuidv4();
    }
  } catch (e) {
    return uuidv4();
  }
}

export const authToken = () => {
  try {
    if (localStorage) {
      const auth = localStorage.auth
      if (auth) {
        return JSON.parse(auth).access_token;
      } else {
        return '';
      }
    } else {
      return '';
    }
  } catch (e) {
    console.log(e);
  }
}

export const country = () => {
  try {
    if (localStorage) {
      const country = localStorage.country
      return country || 'ksa'
    } else {
      return 'ksa';
    }
  } catch (e) {
    console.log(e);
    return 'ksa';
  }
}

const apmReqInterceptor = (serviceName) => (config) => {
  // return config;
  if(env === 'local') return config;
  config.transaction = apm.startTransaction(`${serviceName} Service`, 'custom')
  config.httpSpan = config.transaction ? config.transaction.startSpan(`FETCH ${JSON.stringify(config)}`, 'http') : null;
  return config;
}

const apmResInterceptor = (serviceName) => (response) => {
  // return response;
  if (env === 'local') return response;
  const { httpSpan, transaction } = response.config;
  httpSpan && httpSpan.end();
  transaction && transaction.end();
  return response;
}

const errorInterceptor = (err) => {
  try {
    if (err.response && err.response.status == '401') {
      const auth = JSON.parse(localStorage.getItem('auth'));
      axios.post(`${constants.AUTH_API_URL}/api/v1/refresh`, {
        'auth_version': 'V1',
        'refresh_token': auth.refresh_token
      }).then((res) => {
        auth.access_token = res.data.access_token
        localStorage.setItem('auth', JSON.stringify(auth));
      });
    }
  } catch (e) {
    console.log(e);
  }
  return Promise.reject(err);
}

searchServiceInstance.interceptors.request.use(_.compose(apmReqInterceptor('SEARCH')));
searchServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('SEARCH')), _.compose(errorInterceptor));

listingServiceInstance.interceptors.request.use(_.compose(apmReqInterceptor('LISTING')));
listingServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('LISTING')), _.compose(errorInterceptor));

catalogServiceInstance.interceptors.request.use(_.compose(apmReqInterceptor('CATALOG')));
catalogServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('CATALOG')), _.compose(errorInterceptor));

authServiceInstance.interceptors.request.use(_.compose(apmReqInterceptor('AUTH')));
authServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('AUTH')), _.compose(errorInterceptor));

transacationRedirectUrlInstance.interceptors.request.use(_.compose(apmReqInterceptor('AUTH')));
transacationRedirectUrlInstance.interceptors.response.use(_.compose(apmResInterceptor('AUTH')), _.compose(errorInterceptor));

pimServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('PIM'),
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
pimServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('PIM'))), _.compose(errorInterceptor);

addressServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('ADDRESS'), configModifer()
));
addressServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('ADDRESS')), _.compose(errorInterceptor))

orderServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('ORDER'), configModifer()
));
orderServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('ORDER')), _.compose(errorInterceptor))

paymentServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('PAYMENT'), configModifer()
));
paymentServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('PAYMENT')), _.compose(errorInterceptor))

cartServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('CART'), configModifer()
));
cartServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('CART')), _.compose(errorInterceptor))

camServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('CAM'), configModifer()
));
camServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('CAM')), _.compose(errorInterceptor))


export default {};
