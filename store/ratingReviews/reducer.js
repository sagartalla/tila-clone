import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    userReviews: [],
  },
  error: {},
};
const ratingReviewReducer = typeToReducer({
  [actions.GET_MY_REVIEWS]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        userReviews: action.payload.data,
      },
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
    REJECTED: (state, action) =>
      Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
  [actions.DELETE_MY_REVIEW]: {
    PENDING: state => Object.assign({}, state, { ui: { loading: true } }),
    FULFILLED: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        userReviews: state.data.userReviews.filter(rev => rev.review_id !== parseInt(action.payload, 10)),
      },
      ui: {
        ...state.ui,
        loading: false,
      },
    }),
    REJECTED: (state, action) =>
      Object.assign({}, state, { error: action.payload.message, ui: { loading: false } }),
  },
}, initialState);

export default ratingReviewReducer;
