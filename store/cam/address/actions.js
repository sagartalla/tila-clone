import apis from './api';

const actions = {
  GET_SHIPPING_ADDR_RESULTS: 'GET_SHIPPING_ADDR_RESULTS',
  SEND_NEW_ADDR_DETAILS: 'SEND_NEW_ADDR_DETAILS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
  MAKE_DEFAULT_ADDR: 'MAKE_DEFAULT_ADDR',
  EDIT_ADDR_DETAILS: 'EDIT_ADDR_DETAILS',
};

const actionCreaters = {
  getShippingAddressResults: () => (dispatch, getState) => {
    return dispatch({
      type: actions.GET_SHIPPING_ADDR_RESULTS,
      payload: apis.getAllShippingAddressApi(),
    });
  },

  sendNewAddressDetails: (addressDetails) => (dispatch, getState) => {
    return dispatch({
      type: actions.SEND_NEW_ADDR_DETAILS,
      payload: apis.sendNewAddressDetailsApi(addressDetails)
    })
  },

  editAddressDetails: (addressDetails) => (dispatch, getState) => {
    return dispatch({
      type: actions.EDIT_ADDR_DETAILS,
      payload: apis.editAddressDetailsApi(addressDetails)
    })
  },

  deleteAddress: (addrId) => (dispatch, getState) => {
    return dispatch({
      type: actions.DELETE_ADDRESS,
      payload: apis.deleteAddressApi(addrId)
    })
  },

  makeDefaultAddress: (addrId) => (dispatch, getState) => {
    return dispatch({
      type: actions.MAKE_DEFAULT_ADDR,
      payload: apis.makeDefaultAddressApi(addrId)
    })
  }
};

export { actions, actionCreaters };

