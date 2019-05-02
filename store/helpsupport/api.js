import axios from 'axios';
import constants from '../helper/constants';


const getCategoriesApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-categories`);

const getQuestionsApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-questions`);

const getAllIssuesApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-questions`, { params: { type: 'issues' } });

const getAnswersApi = data => axios.post(`${constants.HNS_URL}/answer/get-answers-by-categories`, data);

const getIssuesApi = data => axios.post(`${constants.HNS_URL}/answer/get-answers-by-categories`, data, { params: { type: 'issues' } });

const getAllTktsApi = params => axios.get(`${constants.HNS_URL}/ticket/get-all`, { params });

const getTktDetailApi = params => axios.get(`${constants.HNS_URL}/ticket/get`, { params });

const raiseTktApi = (params, data) => axios.post(`${constants.HNS_URL}/ticket/create`, data, { params });

const updateTktApi = (params, data) => axios.patch(`${constants.HNS_URL}/ticket/update`, data, { params });

const downloadFileAttachmentApi = (ticketNumber, fileId) => axios.get(`${constants.HNS_URL}/ticket/get-file/${ticketNumber}/${fileId}`);

export default {
  getCategoriesApi, getQuestionsApi, getAllIssuesApi, getAnswersApi, getIssuesApi, getAllTktsApi, getTktDetailApi, raiseTktApi, updateTktApi, downloadFileAttachmentApi,
};
