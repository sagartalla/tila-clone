import shajs from 'sha.js';
import { init as initApm } from 'elastic-apm-js-base';
import fp, * as _ from 'lodash/fp';

import { searchServiceInstance, listingServiceInstance, addressServiceInstance, pimServiceInstance, catalogServiceInstance, authServiceInstance, paymentInstance, transacationRedirectUrlInstance, orderServiceInstance } from './services';

import apmConfig from '../../apm.config';

const apm = initApm({
    serviceName: apmConfig.serviceName,
    serverUrl: apmConfig.serverUrl,
});

export const authToken = () => {
    try {
        if (localStorage) {
            const auth = localStorage.auth
            return JSON.parse(auth).access_token;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
}


const reqInterceptor = (serviceName) => (config) => {
    config.transaction = apm.startTransaction(`${serviceName} Service`, 'custom')
    config.httpSpan = config.transaction ? config.transaction.startSpan(`FETCH ${JSON.stringify(config)}`, 'http') : null;
    return config;
}

const resInterceptor = (serviceName) => (response) => {
    const { httpSpan, transaction } = response.config;
    httpSpan && httpSpan.end();
    transaction && transaction.end();
    return response;
}

searchServiceInstance.interceptors.request.use(_.compose(reqInterceptor('SEARCH')));
searchServiceInstance.interceptors.response.use(_.compose(resInterceptor('SEARCH')));

listingServiceInstance.interceptors.request.use(_.compose(reqInterceptor('LISTING')));
listingServiceInstance.interceptors.response.use(_.compose(resInterceptor('LISTING')));

catalogServiceInstance.interceptors.request.use(_.compose(reqInterceptor('CATALOG')));
catalogServiceInstance.interceptors.response.use(_.compose(resInterceptor('CATALOG')));

authServiceInstance.interceptors.request.use(_.compose(reqInterceptor('AUTH')));
authServiceInstance.interceptors.response.use(_.compose(resInterceptor('AUTH')));

transacationRedirectUrlInstance.interceptors.request.use(_.compose(reqInterceptor('AUTH')));
transacationRedirectUrlInstance.interceptors.response.use(_.compose(resInterceptor('AUTH')));

pimServiceInstance.interceptors.request.use(_.compose(
    reqInterceptor('PIM'),
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
pimServiceInstance.interceptors.response.use(_.compose(resInterceptor('PIM')));

addressServiceInstance.interceptors.request.use(_.compose(
    reqInterceptor('ADDRESS'),
    (config) => {
        config.headers = { "x-access-token": authToken(), "x-country-code": "SAE" };
        return config;
    }
));
addressServiceInstance.interceptors.response.use(_.compose(resInterceptor('ADDRESS')))

orderServiceInstance.interceptors.request.use(_.compose(
    reqInterceptor('ORDER'),
    (config) => {
        config.headers = { "x-access-token": authToken(), "x-country-code": "SAE" };
        return config;
    }
));
orderServiceInstance.interceptors.response.use(_.compose(resInterceptor('ORDER')))

paymentInstance.interceptors.request.use(_.compose(
    reqInterceptor('PAYMENT'),
    (config) => {
        config.headers = { "x-access-token": authToken(), "x-country-code": "SAE" };
        return config;
    }
));
paymentInstance.interceptors.response.use(_.compose(resInterceptor('PAYMENT')))

cartServiceInstance.interceptors.request.use(_.compose(
    reqInterceptor('CART'),
    (config) => {
        config.headers = { "x-country-code": "ksa", "x-session-id": "asdasd", "x-access-token": authToken(), "x-language": 'en' };
        return config;
    }
));
cartServiceInstance.interceptors.response.use(_.compose(resInterceptor('PAYMENT')))

export default {};
