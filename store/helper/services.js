import axios from 'axios';
import constants from './constants';


export const searchServiceInstance = axios.create({
  baseURL: constants.SEARCH_API_URL,
  timeout: 30000,
});

export default {};
