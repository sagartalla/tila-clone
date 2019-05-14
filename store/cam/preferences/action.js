import api from './api';

const actions = {
  GET_NOTIFICATION_PREFERENCES: 'GET_NOTIFICATION_PREFERENCES',
  UPDATE_NOTIFICATION_PREFERENCES: 'UPDATE_NOTIFICATION_PREFERENCES',
};

const actionCreators = {
  getNotificationPreferences: () => ({
    type: actions.GET_NOTIFICATION_PREFERENCES,
    payload: api.getNotificationPreferences(),
  }),
  postPreferences: preference => ({
    type: actions.UPDATE_NOTIFICATION_PREFERENCES,
    preference,
    payload: api.postPreferences(preference),
  }),
};
export { actions, actionCreators };

