import axios from 'axios';
import shajs from 'sha.js';
import constants from './constants';

export const pimServiceInstance = axios.create({
  baseURL: constants.PIM_API_URL,
  timeout: 30000,
});

export default {};
