import { getAllShippingAddressInstance, sendNewAddressDetailsApiInstance, deleteAddressInstance } from '../../helper/services';


const getAllShippingAddressApi = () => {
  return getAllShippingAddressInstance.get('/api/v1/addresses/all').then(({ data }) => {
    return { data };
  });
};

//seding given options/params back for adding in store to existing shipping address.
const sendNewAddressDetailsApi = (options) => {
  return sendNewAddressDetailsApiInstance.post('/api/v1/addresses/create', options).then(({ data }) => {
    return { data, options };
  });
}

const deleteAddressApi = (addrId) => {
  return deleteAddressInstance.delete('/api/v1/addresses/' + addrId).then(( {data} )=> {
    return { data, addrId }
  });
}
export default { getAllShippingAddressApi, sendNewAddressDetailsApi, deleteAddressApi };
