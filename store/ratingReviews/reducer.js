import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    userReviews: []
  },
  error: {},
};
const ratingReviewReducer = typeToReducer({
  [actions.GET_REVIEW_RATING]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          userReviews: action.payload.data
        },
        ui: {
          ...state.ui,
          loading: false
        }
      };
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } });
    },
  }
}, initialState);

export default ratingReviewReducer;
