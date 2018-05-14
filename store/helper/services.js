import axios from 'axios';
import constants from './constants';


export const searchServiceInstance = axios.create({
  baseURL: constants.SEARCH_API_URL,
  timeout: 3000,
});

export const listingServiceInstance = axios.create({
  baseURL: constants.LISTING_API_URL,
  timeout: 3000,
});

// TODO
// Below functions headers hardcoded. remove it and get it values from user session.

export const getAllShippingAddressInstance = axios.create({
  baseURL: constants.CMS_API_URL,
  timeout: 3000,
  headers: {"x-country-code": "IND", "x-auth-user": "100002"},
})

export const sendNewAddressDetailsApiInstance = axios.create({
  baseURL: constants.CMS_API_URL,
  timeout: 3000,
  headers: {"x-country-code": "IND", "x-auth-user": "100002"},
})

export const deleteAddressInstance = axios.create({
  baseURL: constants.CMS_API_URL,
  timeout: 3000,
  headers: {"x-country-code": "IND", "x-auth-user": "100002"},
})

export default {};
