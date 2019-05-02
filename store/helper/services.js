import axios from 'axios';
import shajs from 'sha.js';
import constants from './constants';

const urlEncoder = obj => Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

export const pimServiceInstance = axios.create({
  baseURL: constants.PIM_API_URL,
  timeout: 30000,
});

export const oracleServiceInstance = axios.create({
  baseURL: 'https://fptsuae.custhelp.com/services/rest/connect/v1.3/',
  timeout: 30000,
  headers: {
    Authorization: 'Basic YWRtaW5pc3RyYXRvcjpGcHRzQDEyMzQ1Ng==',
  },
});

export const hnsServiceInstance = axios.create({
  baseURL: 'http://hns-api-stage.fptsinternal.com/api/v1/ticket/',
  timeout: 30000,
  withCredentials: false,
  // paramsSerializer: urlEncoder,
});
export default {};
