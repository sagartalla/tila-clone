import api from './api';

const actions = {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_PREVIEW: 'GET_PREVIEW',
  GET_REVIEW_RATINGS: 'GET_REVIEW_RATINGS',
  SUBMIT_USER_REVIEW: 'SUBMIT_USER_REVIEW',
  SET_SELECTED_VARIANT: 'SET_SELECTED_VARIANT',
  SET_SELECTED_PRODUCT_DATA: 'SET_SELECTED_PRODUCT_DATA',
  GET_CITIES: 'GET_CITIES',
  GET_COUNTRIES: 'GET_COUNTRIES',
  AUTOCOMPLETE_CITY: 'AUTOCOMPLETE_CITY',
  AUTOCOMPLETE_COUNTRY: 'AUTOCOMPLETE_COUNTRY',
  PDP_TRACK: 'PDP_TRACK',
  SET_PRODUCTID: 'SET_PRODUCTID',
  SET_VARIANTID: 'SET_VARIANTID',
  SET_TILA_POLICY: 'GET_SELECTED_TILA_POLICY',
  GET_POLICY_LOCATION: 'GET_POLICY_LOCATION',
  SET_REVIEW_IMAGES: 'SET_REVIEW_IMAGES',
  DOWNLOAD_REVIEW_PIC: 'DOWNLOAD_REVIEW_PIC',
};

const actionCreators = {
  getProduct: params => ({
    type: actions.GET_PRODUCT,
    payload: api.getProduct(params),
  }),
  setTilaPolicy: data => ({
    type:actions.SET_TILA_POLICY,
    data,
  }),
  getPreview: params => ({
    type: actions.GET_PREVIEW,
    payload: api.getPreview(params),
  }),
  getRatingsAndReviews: params => ({
    type: actions.GET_REVIEW_RATINGS,
    payload: api.getReviewRatings(params),
  }),
  submitUserReview: params => ({
    type: actions.SUBMIT_USER_REVIEW,
    payload: api.submitUserReview(params),
  }),
  setSelectedVariant: params => ({
    type: actions.SET_SELECTED_VARIANT,
    payload: api.setSelectedVariant(params),
  }),
  setSelectedProductData: params => ({
    type: actions.SET_SELECTED_PRODUCT_DATA,
    payload: params,
  }),
  setReviewImages: (body, cid) => ({
    type: actions.SET_REVIEW_IMAGES,
    payload: api.uploadReviewImages(body, cid),
  }),
  downloadReviewPics: (imageIds) => {
    return ({
      type: actions.DOWNLOAD_REVIEW_PIC,
      payload: api.downloadReviewPics(imageIds),
    })
  },
  track: params => (dispatch, getState) => {
    const state = getState();
    params.postResult = state.cartReducer.data.items;
    return {
      type: actions.PDP_TRACK,
      payload: api.track(params),
    };
  },
  getCountries: () => ({
    type: actions.GET_COUNTRIES,
    payload: api.getCountries(),
  }),
  setProductId: (id) => ({
    type:actions.SET_PRODUCTID,
    id
  }),
  setVariantId:(id) => ({
    type:actions.SET_VARIANTID,
    id
  }),
  getCitiesByCountryCode: code => ({
    type: actions.GET_CITIES,
    payload: api.getCities(code),
  }),
  autoCompleteCity: searchKeyWord => ({
    type: actions.AUTOCOMPLETE_CITY,
    searchKeyWord,
  }),
  autoCompleteCoutry: searchKeyWord => ({
    type: actions.AUTOCOMPLETE_COUNTRY,
    searchKeyWord,
  }),
};

export { actions, actionCreators };
