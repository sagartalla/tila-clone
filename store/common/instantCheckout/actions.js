import apis from './api';

const actions = {
  INSTANT_CHECKOUT: 'INSTANT_CHECKOUT',
  CLEAR_INSTANT_CHECKOUT: 'CLEAR_INSTANT_CHECKOUT',
  INCLUDE_COD: 'INCLUDE_COD',
  EXCLUDE_COD: 'EXCLUDE_COD',
};

const actionCreators = {
  doInstantCheckout: (params) => {
    return {
      type: actions.INSTANT_CHECKOUT,
      payload: apis.doInstantCheckoutApi(params)
    }
  },
  clearInstantCheckout: () => {
    return {
      type:actions.CLEAR_INSTANT_CHECKOUT    
    }
  },
  includeCOD: () => {
    return {
      type: actions.INCLUDE_COD
    }
  },
  excludeCOD: () => {
    return {
      type: actions.EXCLUDE_COD
    }
  }

};

export { actions, actionCreators };
