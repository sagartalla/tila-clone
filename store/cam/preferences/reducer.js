import typeToReducer from 'type-to-reducer';
import { actions } from './action';

const initialState = {
  notifications: {},
};
const preferencesReducer = typeToReducer({
  [actions.GET_NOTIFICATION_PREFERENCES]: {
    PENDING: state => ({
      ...state,
      loader: true,
    }),
    FULFILLED: (state, action) => {
      const { data } = action.payload;
      const notifications = {};
      data.forEach((st) => {
        notifications[st.setting_sub_group] = st;
      });
      return {
        ...state,
        notifications,
        loader: false,
      };
    },
    REJECTED: state => (
      {
        ...state,
        notifications: {},
        loader: false,
      }),
  },
}, initialState);

export default preferencesReducer;
