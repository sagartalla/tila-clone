import { addressServiceInstance } from '../../helper/services';


const getAllShippingAddressApi = () => {
  return addressServiceInstance.get('/api/v1/addresses/all').then(({ data }) => {
    return { data };
  });
};

//sending given options/params back for adding in store to existing shipping address.
const sendNewAddressDetailsApi = (options) => {
  return addressServiceInstance.post('/api/v1/addresses/create', options).then(({ data }) => {
    return { data, options };
  });
}

const editAddressDetailsApi = (options) => {
  return addressServiceInstance.post('/api/v1/addresses/edit', options).then(({ data }) => {
    return { data, options };
  });
}

const deleteAddressApi = (addrId) => {
  return addressServiceInstance.delete('/api/v1/addresses/' + addrId).then(({ data }) => {
    return { data, addrId }
  });
}

const makeDefaultAddressApi = (addrId) => {
  return addressServiceInstance.put('/api/v1/addresses/default/' + addrId).then(({ data }) => {
    return { data, addrId }
  });
}

export default { getAllShippingAddressApi, sendNewAddressDetailsApi, editAddressDetailsApi, deleteAddressApi, makeDefaultAddressApi };
