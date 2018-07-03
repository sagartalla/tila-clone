import api from './api';

const actions = {
  GET_MESSAGES: 'GET_MESSAGES',
};

const actionCreators = {
  getMessages: (params) => {
    return ({
      type: actions.GET_MESSAGES,
      payload: api.getMessagesApi(params)
    })
  }
};


export { actions, actionCreators };
