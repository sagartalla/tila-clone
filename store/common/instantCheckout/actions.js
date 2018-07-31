import apis from './api';

const actions = {
  INSTANT_CHECKOUT: 'INSTANT_CHECKOUT'
};

const actionCreators = {
  doInstantCheckout: (params) => {
    return {
      type: actions.INSTANT_CHECKOUT,
      payload: apis.doInstantCheckoutApi(params)
    }
  }
};

export { actions, actionCreators };
