import axios from 'axios';
import shajs from 'sha.js';
import constants from './constants';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImlzcyI6ImZwdHMiLCJleHAiOjE1MjcxNTM1NjIsInR5cGUiOiJBVCIsImlhdCI6MTUyNzE0OTk2MiwidXNlcklkIjoiMTAwMDA4IiwidmVyc2lvbiI6IlYxIiwianRpIjoiZDVlYzQ5ZmNhZDZmNDNhMjk4M2ZjYTQ5MDUzYTBjMzMifQ.lyqvuc5apFuFKCU2r4Hiy590GV6qdPGxWVnKeoaynrCjL_bHwS6u8LJ3oMTyltWjZA9HVPwwCHjV6Hl82e851w";

export const searchServiceInstance = axios.create({
  baseURL: constants.SEARCH_API_URL,
  timeout: 3000,
});

export const listingServiceInstance = axios.create({
  baseURL: constants.LISTING_API_URL,
  timeout: 30000,
});

// TODO SF-26
// Below function headers hardcoded. remove it and get it values from user session.
export const addressServiceInstance = axios.create({
  baseURL: constants.CMS_API_URL,
  timeout: 3000,
  headers: { "x-country-code": "IND", "x-auth-user": "100002" },
})

export const pimServiceInstance = axios.create({
  baseURL: constants.PIM_API_URL,
  timeout: 30000,
});

export const catalogServiceInstance = axios.create({
  baseURL: constants.CATALOG_API_URL,
  timeout: 3000,
});

export const orderServiceInstance = axios.create({
  baseURL: constants.ORDER_API_URL,
  timeout: 3000,
  headers: { "x-country-code": "QWE", "x-auth-user": "100002" },
})

export const cartServiceInstance = axios.create({
  baseURL: constants.CART_API_URL,
  timeout: 3000,
  headers: { "x-country-code": "SAE", "x-session-id": "asdasd", "x-access-token": token,"x-language": 'en' },
})

export const authServiceInstance = axios.create({
  baseURL: constants.AUTH_API_URL,
  timeout: 3000,
})

pimServiceInstance.interceptors.request.use(
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
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default {};
