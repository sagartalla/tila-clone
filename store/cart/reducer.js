import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: true,
    btnLoading: false,
  },
  data: {
    addToCart: {},
    items: [],
    cartButtonLoaders: {},
  },
  error: '',
  editDetails: true
};

const cartReducer = typeToReducer({
  [actions.GET_CART_DETAILS]: {
    PENDING: state => Object.assign({}, state, {
      ...state,
      ui: { loading: true },
    }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      ...state,
      data: {
        ...state.data,
        ...action.payload.data,
      },
      ui: { loading: false },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
  },
  [actions.ADD_TO_CART]: {
    PENDING: state => Object.assign({}, state, {
      ...state,
      ui: {
        loading: true,
        btnLoading: true,
      },
    }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
      ...state,
      data: {
        ...state.data,
        addToCart: action.payload.data,
      },
      ui: {
        loading: false,
        btnLoading: false,
      },
    })},
    REJECTED: (state, action) => Object.assign({}, state, {
      ...state,
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {
        loading: false,
        btnLoading: false,
      },
    }),
  },
  [actions.REMOVE_CART_ITEM]: {
    PENDING: state => Object.assign({}, state, {
      ...state,
      ui: { loading: true },
    }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload.data
        },
        ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response ? action.payload.response.data.message : action.payload.message,
        ui: {
          loading: false,
        }
      });
    },
  },
  [actions.GET_CART_EDIT_DETAILS]: (state,action) => {
    return {
      ...state, editDetails:action.payload
    }
  },
  [actions.CART_ITEM_COUNT]: {
    PENDING: state => Object.assign({}, state, {
      ...state,
      ui: { loading: true },
    }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      data: {
        ...state.data,
        ...action.payload.data,
      },
      ui: {
        loading: false,
        loader: 'hide',
      },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {
        loading: false,
      },
    }),
  },
  [actions.ADD_REMOVE_GIFT]: {
    PENDING: state => Object.assign({}, state, {
      ...state,
      ui: { loading: true },
    }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      ...state,
      data: {
        ...state.data,
        ...action.payload.data,
      },
      ui: { loading: false },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      ...state,
      error: action.payload.response ? action.payload.response.data.message : action.payload.message,
      ui: {
        loading: false,
      },
    }),
  },
  [actions.RESET_ADD_TO_CART]: state => ({
    ...state,
    data: {
      ...state.data,
      addToCart: {},
    },
  }),
  [actions.SHOW_CART_BUTTON_LOADER]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        cartButtonLoaders: {
          ...state.data.cartButtonLoaders,
          [action.params.listing_id]: true,
        },
      },
    };
  },
  [actions.HIDE_CART_BUTTON_LOADER]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        cartButtonLoaders: {
          ...state.data.cartButtonLoaders,
          [action.params.listing_id]: false,
        },
      },
    };
  },
}, initialState);

export default cartReducer;
