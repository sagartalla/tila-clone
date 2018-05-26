import apis from './api';

const actions = {
  CREATE_ORDER: 'CREATE_ORDER',
  DO_PAYMENT: 'DO_PAYMENT'
};

const actionCreators = {
  createOrder: (defaultAddrId) => (dispatch, getState) => {

    // const temp_params = JSON.parse(localStorage.getItem('cartJson') || '{}')

    // const temp_params = {
    //   "country_code": "IND",
    //   "currency_code": "INR",
    //   "customer_account_id": "100002",
    //   "items": [
    //     {
    //       "catalog_id": "2",
    //       "inventory_location_id": "1",
    //       "item_type": "string",
    //       "listing_id": "string",
    //       "product_id": "string",
    //       "seller_id": "string",
    //       "selling_price": 100,
    //       "title": "string",
    //       "variant_id": "string"
    //     }
    //   ]
    // }

    return dispatch({
      type: actions.CREATE_ORDER,
      payload: apis.createOrderApi(defaultAddrId),
    });
  },

  doPayment: (params) => (dispatch, getState) => {
    return dispatch({
      type: actions.DO_PAYMENT,
      payload: apis.doPaymentApi(params)
    });
  },
};

export { actions, actionCreators };

