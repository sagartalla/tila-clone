import _ from 'lodash';

const getPaymentOptions = (store) => {
  if (store.paymentsReducer.data && store.paymentsReducer.data.orderRes) {
    return store.paymentsReducer.data;
  }
  return {};
}

const getPaymentUrl = (store) => {
  if (store.paymentsReducer.data && store.paymentsReducer.data.payRes) {
    return store.paymentsReducer.data.payRes;
  }
  return {};
}

const getDefaultAddress = (store) => {
  let defaultAdd;
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    defaultAdd = _.find(store.shippingAddrReducer.data, value => value.default);
  }
  if(!defaultAdd) {
    if(store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
        return [store.shippingAddrReducer.data[0]];
    } else {
      return [{}];
    }
  } else {
    return defaultAdd;
  }
};

const getPaymentModesData = (store) => {
  /*
    {
      voucherData: {}
      paymentModes: [],
      transaction_id
    }
  */

  if(store.paymentsReducer.data.data) {
    const paymentModesData = store.paymentsReducer.data.data.payment_options_available.reduce((acc, val, key) => {
      if (val.type === 'VOUCHER') {
        acc.voucherData = {
          ...val,
          total_amount: store.paymentsReducer.data.data.amount,
        };
      } else {
        acc.paymentModes[val.type] = val;
      }
      return acc;
    }, {
      voucherData: null,
      paymentModes: {},
    });
    paymentModesData.transaction_id = store.paymentsReducer.data.data.transaction_id;
    return paymentModesData;
  }
  return {
    voucherData: {},
    paymentModes: {},
  }
}

const getProcessData = (store) => {
  return store.paymentsReducer.data.processData;
}


const getLoader = (store) => {
  return store.paymentsReducer.ui.loading;
}


const get3dSecureRedirectionUrl = (store) => {
  const { redirect3dSecureData } = store.paymentsReducer.data;
  if(redirect3dSecureData) {
    return redirect3dSecureData.redirect_url;
  }
}

const getSelectedAddress = (store) => {
  let selectedAddress;
  if (store.shippingAddrReducer.data && store.shippingAddrReducer.data.length > 0) {
    selectedAddress =  _.find(store.shippingAddrReducer.data, value => value.address_id === store.shippingAddrReducer.data.deliverToAddress);
  }
  if(!selectedAddress) {
    return getDefaultAddress(store)[0];
  }
}

export { getPaymentOptions, getPaymentUrl, getDefaultAddress, getPaymentModesData, getProcessData, get3dSecureRedirectionUrl, getLoader, getSelectedAddress };
