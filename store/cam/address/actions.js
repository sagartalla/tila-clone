import apis from './api';

const actions = {
  GET_SHIPPING_ADDR_RESULTS: 'GET_SHIPPING_ADDR_RESULTS',
  SEND_NEW_ADDR_DETAILS: 'SEND_NEW_ADDR_DETAILS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
};

const actionCreaters = {
  getShippingAddressResults: () => (dispatch, getState) => {
    return dispatch({
      type: actions.GET_SHIPPING_ADDR_RESULTS,
      payload: apis.getAllShippingAddressApi(),
    });
  },

  // Ownstate here is main component state.passing shipping address details which is entered by user.
  sendNewAddressDetails: (ownState) => (dispatch, getState) => {
    var newAddr = {
      "address_line_1": ownState.flat +' '+ ownState.colony,
      "address_line_2": ownState.street_name,
      "address_type": "home",
      "city": ownState.city,
      "contact_name": ownState.fName +' '+ ownState.lName,
      "latitude": 0,
      "longitude": 0,
      "mobile_country_code": "+91",
      "mobile_no": ownState.mob,
      "postal_code": "001",
      "shipping_country_code": "IND",
      "state": "KA"
    }

    return dispatch({
      type: actions.SEND_NEW_ADDR_DETAILS,
      payload: apis.sendNewAddressDetailsApi(newAddr)
    })
  },

  deleteAddress: (addrId) => (dispatch, getState) => {
    return dispatch({
      type: actions.DELETE_ADDRESS,
      payload: apis.deleteAddressApi(addrId)
    })
  }
};

export { actions, actionCreaters, deleteAddress };

