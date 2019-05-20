const getShippingAddressResults = (store) => {
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    return store.shippingAddrReducer.data;
  }
  return [];
};

const getAddressWithNameAndPhone = (store) => {
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    return store.shippingAddrReducer.data.map(item => ({
      name: `${item.first_name} ${item.last_name}`,
      address: `${item.address_line_1} ${item.address_line_2} ${item.city} ${item.state}`,
      phone: item.mobile_no,
      id: item.address_id,
    }));
  }
  return [];
};

const getAddrById = store => (addrId) => {
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    return store.shippingAddrReducer.data.filter(value => value.address_id === parseInt(addrId, 10));
  }
  return false;
};

const getDefaultAddress = (store) => {
  const ddA = store.shippingAddrReducer.data.deliverToAddress
  if(ddA) {
    return ddA;
  }
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    return _.filter(store.shippingAddrReducer.data, value => value.default);
  }
  return false;
};

export { getShippingAddressResults, getAddrById, getAddressWithNameAndPhone, getDefaultAddress };
