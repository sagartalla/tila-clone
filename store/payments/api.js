import axios from 'axios';
import Cookies from 'universal-cookie';

import constants from '../helper/constants';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

//Create Order Third step.
const transactionApi = (orderRes) => {
  return axios.get(`${orderRes.redirect_url}?use_wallet=false`).then(({ data }) => {
    return {
      orderRes,
      data,
      transactionUrl: orderRes.redirect_url
    };
  });
};

const refreshTransactionApi = (url, useWallet) => {
  return axios.get(`${url}?use_wallet=${useWallet}`).then(({ data }) => {
    return {
      data
    };
  });
}

//Create Order Second step.
const createOrder = () => {
  return axios.post(`${constants.CART_API_URL}/api/v1/cart/checkout`).then(({ data }) => {
    return transactionApi(data);
  });
};

//Create Order First step.
const createOrderApi = (defaultAddrId) => {
  return createOrder();
};

const doPaymentApi = (params) => {
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/process`, params).then(({ data }) => {
    return { data }
  });
}

const getRedirectApi = (params) => {
  return axios.get(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/gateway/callback/${params.encryptedString}`).then(({data}) => data)
}

const saveCardApi = (params) => {
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/save_card`, params).then(({ data }) => {
    return { data }
  });
}

const makeProcessRequest = (params) => {
  params.redirect_url = `${window.location.origin}/${language}`;
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/process`, params).then(({data}) => data);
}

export default { refreshTransactionApi, createOrderApi, doPaymentApi, saveCardApi, makeProcessRequest, getRedirectApi };
