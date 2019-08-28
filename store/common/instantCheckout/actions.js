import apis from './api';

const actions = {
  INSTANT_CHECKOUT: 'INSTANT_CHECKOUT',
  CLEAR_INSTANT_CHECKOUT: 'CLEAR_INSTANT_CHECKOUT'
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

};

export { actions, actionCreators };
