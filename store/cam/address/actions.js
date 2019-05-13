import apis from './api';
import { actionCreators as cartActionCreators } from '../../cart';

const actions = {
  GET_SHIPPING_ADDR_RESULTS: 'GET_SHIPPING_ADDR_RESULTS',
  SEND_NEW_ADDR_DETAILS: 'SEND_NEW_ADDR_DETAILS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
  MAKE_DEFAULT_ADDR: 'MAKE_DEFAULT_ADDR',
  EDIT_ADDR_DETAILS: 'EDIT_ADDR_DETAILS',
  SELECT_DELIVER_TO_ADDRESS: 'SELECT_DELIVER_TO_ADDRESS',
};

const actionCreators = {
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
    }).then(() => {
      dispatch(cartActionCreators.getCartResults())
    })
  },

  editAddressDetails: (addressDetails) => (dispatch, getState) => {
    return dispatch({
      type: actions.EDIT_ADDR_DETAILS,
      payload: apis.editAddressDetailsApi(addressDetails)
    }).then(() => {
      dispatch(cartActionCreators.getCartResults())
    })
  },

  deleteAddress: (addrId) => (dispatch, getState) => {
    return dispatch({
      type: actions.DELETE_ADDRESS,
      payload: apis.deleteAddressApi(addrId)
    }).then(() => {
      dispatch(cartActionCreators.getCartResults())
    })
  },

  makeDefaultAddress: (addrId) => (dispatch, getState) => {
    return dispatch({
      type: actions.MAKE_DEFAULT_ADDR,
      payload: apis.makeDefaultAddressApi(addrId)
    }).then(() => {
      dispatch(cartActionCreators.getCartResults())
    })
  },

  selectDeliverToAddress: (addId) => (dispatch, getState) =>  {
    dispatch({
      type: actions.SELECT_DELIVER_TO_ADDRESS,
      payload: addId
    })
    dispatch(cartActionCreators.getCartResults({
      address_id: addId
    }));
  }
};

export { actions, actionCreators };
