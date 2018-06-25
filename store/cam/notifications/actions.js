import api from './api';

const actions = {
  GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
};

const actionCreators = {
  getNotifications: () => {
    return ({
      type: actions.GET_NOTIFICATIONS,
      payload: api.getNotificationsApi()
    });    
  }
}

export { actions, actionCreators };