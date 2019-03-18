import axios from 'axios';
import { toast } from 'react-toastify';

import constants from '../../helper/constants';

const getAllShippingAddressApi = () => {
  return axios.get(`${constants.CMS_API_URL}/api/v1/addresses/all`).then(({ data }) => {
    return { data };
  });
};

//sending given options/params back for adding in store to existing shipping address.
const sendNewAddressDetailsApi = (options) => {
  return axios.post(`${constants.CMS_API_URL}/api/v1/addresses/create`, options).then(({ data }) => {
    toast.success('Shipping Address added');
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
    toast.success('Shipping address deleted');
    return { data, addrId }
  });
}

const makeDefaultAddressApi = (addrId) => {
  return axios.put(`${constants.CMS_API_URL}/api/v1/addresses/default/` + addrId).then(({ data }) => {
    toast.success('Default shipping address updated');
    return { data, addrId }
  });
}

export default { getAllShippingAddressApi, sendNewAddressDetailsApi, editAddressDetailsApi, deleteAddressApi, makeDefaultAddressApi };
