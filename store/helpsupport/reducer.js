import typeToReducer from 'type-to-reducer';
import { actions } from './action';
import selectors from './selectors';

const initialState = {
  categoryData: {},
  isCategoryLoaded: false,
  questionData: {},
  answerData: {},
  tktData: [],
  tktDetailData: {},
  raiseTktData: {},
  updateTktData: {},
};
const helpSupportData = typeToReducer({
  [actions.GET_CATEGORIES]: {
    PENDING: state => ({
      ...state, categoryData: {}, isCategoryLoaded: false,
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        categoryData: selectors.computeCategory(payload.data),
        isCategoryLoaded: true,
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
  [actions.GET_QUESTIONS]: {
    PENDING: state => ({
      ...state, questionData: {},
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        questionData: selectors.computeQuestion(payload.data),
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
  [actions.GET_ANSWERS]: {
    PENDING: state => ({
      ...state, answerData: {},
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        answerData: selectors.computeAnswer(payload.data),
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
  [actions.GET_TKTS]: {
    PENDING: state => ({
      ...state, tktData: [],
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        tktData: payload.data,
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
  [actions.GET_TKT_DETAIL]: {
    PENDING: state => ({
      ...state, tktDetailData: {},
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        tktDetailData: payload.data,
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
  [actions.RAISE_TKT]: {
    PENDING: state => ({
      ...state, raiseTktData: {},
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        raiseTktData: payload.data,
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
  [actions.UPDATE_TKT]: {
    PENDING: state => ({
      ...state, updateTktData: {},
    }),
    FULFILLED: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        updateTktData: payload.data,
      };
    },
    REJECTED: state => (
      {
        ...state,
      }),
  },
}, initialState);

export default helpSupportData;
