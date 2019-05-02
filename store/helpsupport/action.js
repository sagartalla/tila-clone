import api from './api';

const actions = {
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_QUESTIONS: 'GET_QUESTIONS',
  GET_ALL_ISSUES: 'GET_ALL_ISSUES',
  GET_ANSWERS: 'GET_ANSWERS',
  GET_ISSUES: 'GET_ISSUES',
  GET_TKTS: 'GET_TKTS',
  GET_TKT_DETAIL: 'GET_TKT_DETAIL',
  RAISE_TKT: 'RAISE_TKT',
  UPDATE_TKT: 'UPDATE_TKT',
};


const actionCreators = {
  getCategories: query => ({
    type: actions.GET_CATEGORIES,
    payload: api.getCategoriesApi(query),
  }),
  getQuestions: query => ({
    type: actions.GET_QUESTIONS,
    payload: api.getQuestionsApi(query),
  }),
  getAllIssues: query => ({
    type: actions.GET_ALL_ISSUES,
    payload: api.getAllIssuesApi(query),
  }),
  getAnswers: query => ({
    type: actions.GET_ANSWERS,
    payload: api.getAnswersApi(query),
  }),
  getIssues: query => ({
    type: actions.GET_ISSUES,
    payload: api.getIssuesApi(query),
  }),
  getAllTickets: params => ({
    type: actions.GET_TKTS,
    payload: api.getAllTktsApi(params),
  }),
  getTicketDetail: params => ({
    type: actions.GET_TKT_DETAIL,
    payload: api.getTktDetailApi(params),
  }),
  raiseTicket: (params, data) => ({
    type: actions.RAISE_TKT,
    payload: api.raiseTktApi(params, data),
  }),
  updateTicket: (params, data) => ({
    type: actions.UPDATE_TKT,
    payload: api.updateTktApi(params, data),
  }),
  downloadFileAttachment: (ticketNumber, fileId) => ({
    type: actions.DOWNLOAD_FILE_ATTACHMENT,
    payload: api.downloadFileAttachmentApi(ticketNumber, fileId),
  }),
};

export { actions, actionCreators };
