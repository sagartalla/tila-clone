import axios from 'axios';
import constants from '../helper/constants';
import { oracleServiceInstance, hnsServiceInstance } from '../helper/services';

const BaseURL = 'queryResults?query=';

const getCategoriesApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-categories`);

const getQuestionsApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-questions`);

const getAnswersApi = data => axios.post(`${constants.HNS_URL}/answer/get-answers-by-categories`, data);
//const getAnswersApi = query => oracleServiceInstance.get(`${BaseURL}${encodeURIComponent(query)}`);

const getAllTktsApi = params => axios.get(`${constants.HNS_URL}/ticket/get-all`, { params });

const getTktDetailApi = params => axios.get(`${constants.HNS_URL}/ticket/get`, { params });

const raiseTktApi = (params, data) => axios.post(`${constants.HNS_URL}/ticket/create`, data, { params });

const updateTktApi = (params, data) => axios.patch(`${constants.HNS_URL}/ticket/update`, data, { params });

const downloadFileAttachmentApi = (ticketNumber, fileId) => axios.get(`${constants.HNS_URL}/ticket/get-file/${ticketNumber}/${fileId}`);

export default {
  getCategoriesApi, getQuestionsApi, getAnswersApi, getAllTktsApi, getTktDetailApi, raiseTktApi, updateTktApi, downloadFileAttachmentApi,
};
