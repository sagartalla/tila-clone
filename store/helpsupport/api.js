import axios from 'axios';
import constants from '../helper/constants';
import { oracleServiceInstance, hnsServiceInstance } from '../helper/services';

const BaseURL = 'queryResults?query=';

const getCategoriesApi = query => oracleServiceInstance.get(`${BaseURL}${encodeURIComponent(query)}`);

const getQuestionsApi = query => oracleServiceInstance.get(`${BaseURL}${encodeURIComponent(query)}`);

const getAnswersApi = query => oracleServiceInstance.get(`${BaseURL}${encodeURIComponent(query)}`);

const getAllTktsApi = params => axios.get(`${constants.HNS_URL}/ticket/get-all`, { params });

const getTktDetailApi = params => axios.get(`${constants.HNS_URL}/ticket/get`, { params });

const raiseTktApi = (params, data) => axios.post(`${constants.HNS_URL}/ticket/create`, data, { params });

const updateTktApi = (params, data) => axios.patch(`${constants.HNS_URL}/ticket/update`, data, { params });


export default {
  getCategoriesApi, getQuestionsApi, getAnswersApi, getAllTktsApi, getTktDetailApi, raiseTktApi, updateTktApi,
};
