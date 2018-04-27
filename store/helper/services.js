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

export default {};
