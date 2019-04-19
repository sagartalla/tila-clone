import axios from 'axios';
import { toast } from 'react-toastify';

import constants from '../../helper/constants';
import { languageDefinations } from '../../../utils/lang/';

const { API_TEXT } = languageDefinations();

const getAllShippingAddressApi = () => {
  return axios.get(`${constants.CMS_API_URL}/api/v1/addresses/all`).then(({ data }) => {
    return { data };
  });
};

//sending given options/params back for adding in store to existing shipping address.
const sendNewAddressDetailsApi = (options) => {
  return axios.post(`${constants.CMS_API_URL}/api/v1/addresses/create`, options).then(({ data }) => {
    toast.success(API_TEXT.SHIPPING_ADDRESS_ADDED);
    return { data, options };
  });
}

const editAddressDetailsApi = (options) => {
  return axios.post(`${constants.CMS_API_URL}/api/v1/addresses/edit`, options).then(({ data }) => {
    return { data, options };
  });
}

const deleteAddressApi = (addrId) => {
  return axios.delete(`${constants.CMS_API_URL}/api/v1/addresses/` + addrId).then(({ data }) => {
    toast.success(API_TEXT.SHIPPING_ADDRESS_DELETED);
    return { data, addrId }
  });
}

const makeDefaultAddressApi = (addrId) => {
  return axios.put(`${constants.CMS_API_URL}/api/v1/addresses/default/` + addrId).then(({ data }) => {
    toast.success(API_TEXT.DEFAULT_SHIPPING_ADDRESS_UPDATAED);
    return { data, addrId }
  });
}

export default { getAllShippingAddressApi, sendNewAddressDetailsApi, editAddressDetailsApi, deleteAddressApi, makeDefaultAddressApi };
