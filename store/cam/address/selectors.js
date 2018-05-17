const getShippingAddressResults = (store) => {
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    return store.shippingAddrReducer.data;
  }
  return [];
}

const getAddrById = (store) => (addrId) => {
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    return _.filter(store.shippingAddrReducer.data, function (value, key) { return value.address_id === addrId; });
  }
  return false;
}

export { getShippingAddressResults, getAddrById };