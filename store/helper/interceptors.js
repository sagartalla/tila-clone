import shajs from 'sha.js';
import { init as initApm } from 'elastic-apm-js-base';
import fp, * as _ from 'lodash/fp';
import axios from 'axios';

import { 
  searchServiceInstance, 
  listingServiceInstance, 
  addressServiceInstance,
  pimServiceInstance,
  catalogServiceInstance,
  authServiceInstance,
  paymentInstance,
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
  config.transaction = apm.startTransaction(`${serviceName} Service`, 'custom')
  config.httpSpan = config.transaction ? config.transaction.startSpan(`FETCH ${JSON.stringify(config)}`, 'http') : null;
  return config;
}

const apmResInterceptor = (serviceName) => (response) => {
  const { httpSpan, transaction } = response.config;
  httpSpan && httpSpan.end();
  transaction && transaction.end();
  return response;
}

const errorInterceptor = (err) => {
  try {
    if (err.response && err.response.status === '401') {
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
  apmReqInterceptor('ADDRESS'),
  (config) => {
    config.headers = { "x-access-token": authToken(), "x-country-code": country() };
    return config;
  }
));
addressServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('ADDRESS')), _.compose(errorInterceptor))

orderServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('ORDER'),
  (config) => {
    config.headers = { "x-access-token": authToken(), "x-country-code": country() };
    return config;
  }
));
orderServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('ORDER')), _.compose(errorInterceptor))

paymentInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('PAYMENT'),
  (config) => {
    config.headers = { "x-access-token": authToken(), "x-country-code": country() };
    return config;
  }
));
paymentInstance.interceptors.response.use(_.compose(apmResInterceptor('PAYMENT')), _.compose(errorInterceptor))

cartServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('CART'),
  (config) => {
    config.headers = { "x-country-code": country(), "x-session-id": "asdasd", "x-access-token": authToken(), "x-language": 'en' };
    return config;
  }
));
cartServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('CART')), _.compose(errorInterceptor))

camServiceInstance.interceptors.request.use(_.compose(
  apmReqInterceptor('CAM'),
  (config) => {
    config.headers = { "x-access-token": authToken(), "x-country-code": country() };
    return config;
  }
));
camServiceInstance.interceptors.response.use(_.compose(apmResInterceptor('CAM')), _.compose(errorInterceptor))


export default {};
