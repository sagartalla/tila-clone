import _ from 'lodash';

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
    return store.shippingAddrReducer.data.filter(value => value.address_id == addrId); // Don't change to ===
  }
  return false;
};

const getDefaultAddress = (store) => {
  let defaultAdd = [{}];
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    defaultAdd = [_.find(store.shippingAddrReducer.data, value => value.default)];
  }
  if(defaultAdd && defaultAdd.length === 0) {
    if(store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
      defaultAdd = [store.shippingAddrReducer.data[0]];
    }
  }

  return defaultAdd;
};

const getSelectedAddress = (store) => {
  let selectedAddress;
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    selectedAddress =  _.find(store.shippingAddrReducer.data, value => value.address_id === store.shippingAddrReducer.deliverToAddress);
  }
  if(!selectedAddress) {
    selectedAddress = getDefaultAddress(store)[0];
  }
  if(store.shippingAddrReducer.data.length > 0 && !selectedAddress) {
    selectedAddress = store.shippingAddrReducer.data[0]
  }
  return selectedAddress || {};
}

export { getShippingAddressResults, getAddrById, getAddressWithNameAndPhone, getDefaultAddress, getSelectedAddress };
