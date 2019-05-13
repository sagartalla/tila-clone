
import api from './api';

const actions = {
  GET_NOTIFICATION_PREFERENCES: 'GET_NOTIFICATION_PREFERENCES',
  COUPON_DATA: 'COUPON_DATA',
};

const actionCreators = {
  getNotificationPreferences: () => ({
    type: actions.GET_NOTIFICATION_PREFERENCES,
    payload: api.getNotificationPreferences(),
  }),
};
export { actions, actionCreators };

