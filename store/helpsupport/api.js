import axios from 'axios';
import Cookies from 'universal-cookie';
import constants from '../helper/constants';

const cookies = new Cookies();

const lang = cookies.get('language') || 'ar';

const getAnswerByKeywordApi = (keyword, params) => axios.post(`${constants.HNS_URL}/answer/search-answers`, [keyword], { params: { ...params, lang } });

const getCategoriesApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-categories`, { params: { lang } });

const getQuestionsApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-questions`, { params: { lang } });

const getAllIssuesApi = () => axios.get(`${constants.HNS_URL}/answer/get-all-questions`, { params: { type: 'issues', lang } });

const getAnswersApi = data => axios.post(`${constants.HNS_URL}/answer/get-answers-by-categories`, data, { params: { lang } });

const getIssuesApi = data => axios.post(`${constants.HNS_URL}/answer/get-answers-by-categories`, data, { params: { type: 'issues', lang } });

const getAllTktsApi = params => axios.get(`${constants.HNS_URL}/ticket/get-all`, { params: { ...params, lang } });

const getTktDetailApi = params => axios.get(`${constants.HNS_URL}/ticket/get`, { params: { ...params, lang } });

const raiseTktApi = (params, data) => axios.post(`${constants.HNS_URL}/ticket/create`, data, { params: { ...params, lang } });

const updateTktApi = (params, data) => axios.patch(`${constants.HNS_URL}/ticket/update`, data, { params: { ...params, lang } });

const downloadFileAttachmentApi = (ticketNumber, fileId) => axios.get(`${constants.HNS_URL}/ticket/get-file/${ticketNumber}/${fileId}`, { params: { lang } });

export default {
  getAnswerByKeywordApi,
  getCategoriesApi,
  getQuestionsApi,
  getAllIssuesApi,
  getAnswersApi,
  getIssuesApi,
  getAllTktsApi,
  getTktDetailApi,
  raiseTktApi,
  updateTktApi,
  downloadFileAttachmentApi,
};
