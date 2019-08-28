import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  reviews: [],
  reviewResponse: {},
  variantsData: {},
  error: null,
  searchCityKeyWord: '',
  searchCountryKeyWord: '',
  allCitiesData: [],
  countriesData: [],
  productId: null,
  varaintId: null,
  tilaPolicy: {
    extended_warranty: '',
    damage_protection: '',
  },
  policyLocation: {},
};
const productReducer = typeToReducer({
  [actions.GET_PRODUCT]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
        variantsData: {
          selectedVariantId: Object.keys(action.payload.data[0].variant_preferred_listings || {})[0],
        },
        ui: { loading: false, error: null },
      });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.GET_PREVIEW]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: true } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
    },
  },
  [actions.GET_REVIEW_RATINGS]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { reviews: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: {loading: false }} )
    },
  },
  [actions.SUBMIT_USER_REVIEW]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { reviewResponse: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: {loading: false }} )
    },
  },
  [actions.SET_SELECTED_VARIANT]: {
    PENDING: state => {
      return Object.assign({}, state, { ui: { loading: true }});
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { variantsData: action.payload, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, { error: action.payload.message, ui: {loading: false }});
    },
  },
  [actions.SET_SELECTED_PRODUCT_DATA]: (state, action) => {
    return state;
  },

  [actions.GET_CITIES]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      ui: {
        ...state.ui,
        loading: false,
      },
      allCitiesData: action.payload && action.payload.data,
    }),
    REJECTED: state =>
      Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
  },
  [actions.GET_COUNTRIES]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true } }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      ui: {
        ...state.ui,
        loading: false,
      },
      countriesData: action.payload && action.payload.data,
    }),
    REJECTED: state => Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
  },
  [actions.GET_POLICY_LOCATION]: {
    PENDING: state => Object.assign({}, state, { ui: { ...state.ui, loading: true } }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        ui: {
          ...state.ui,
          loading: false,
        },
        policyLocation: {
          ...action.payload.data,
        },
      });
    },
    REJECTED: state => Object.assign({}, state, { ui: { ...state.ui, loading: false } }),
  },
  [actions.SET_TILA_POLICY]: (state, action) => Object.assign({}, state, {
    tilaPolicy: action.data,
  }),
  [actions.SET_PRODUCTID]: (state, action) => Object.assign({}, state, {
    productId: action.id,
  }),
  [actions.SET_VARIANTID]: (state, action) => Object.assign({}, state, {
    variantId: action.id,
  }),
  [actions.AUTOCOMPLETE_CITY]: (state, action) => Object.assign({}, state, {
    searchCityKeyWord: action.searchKeyWord,
  }),
  [actions.AUTOCOMPLETE_COUNTRY]: (state, action) => Object.assign({}, state, {
    searchCountryKeyWord: action.searchKeyWord,
  }),
}, initialState);

export default productReducer;
