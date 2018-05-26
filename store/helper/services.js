import axios from 'axios';
import shajs from 'sha.js';
import constants from './constants';

export const authToken = () => {
  try {
    if (localStorage) {
      const auth = localStorage.auth
      return JSON.parse(auth).access_token;
    } else {
      return false;
    }
  } catch (e) {
    return '';
  }
}

export const searchServiceInstance = axios.create({
  baseURL: constants.SEARCH_API_URL,
  timeout: 3000,
});

export const listingServiceInstance = axios.create({
  baseURL: constants.LISTING_API_URL,
  timeout: 30000,
});

export const addressServiceInstance = axios.create({
  baseURL: constants.CMS_API_URL,
  timeout: 3000,
});

export const camServiceInstance = axios.create({
  baseURL: constants.CMS_API_URL,
  timeout: 3000,
});

export const pimServiceInstance = axios.create({
  baseURL: constants.PIM_API_URL,
  timeout: 30000,
});

export const catalogServiceInstance = axios.create({
  baseURL: constants.CATALOG_API_URL,
  timeout: 3000,
});

export const orderServiceInstance = axios.create({
  baseURL: constants.ORDERS_API_URL,
  timeout: 3000,
  headers: { "x-country-code": "QWE", "x-auth-user": "100002" },
});

export const cartServiceInstance = axios.create({
  baseURL: constants.CART_API_URL,
  timeout: 3000,
})

export const authServiceInstance = axios.create({
  baseURL: constants.AUTH_API_URL,
  timeout: 3000,
});

export const transacationRedirectUrlInstance = axios.create({
  baseURL: '',
  timeout: 3000,
});

export const paymentInstance = axios.create({
  baseURL: constants.TRANSACTIONS_API_URL,
  timeout: 3000,
});

// axios.post('http://gateway-dev.fptechscience.com/cart/api/v1/cart/add')

// axios.interceptors.response.use((res) => {
//   debugger;
//   return res;
// }, (err) => {
//   debugger;
//   return err
// });

export default {};
