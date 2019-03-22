import axios from 'axios';
import Cookies from 'universal-cookie';

import constants from '../helper/constants';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

//Create Order Third step.
const transactionApi = (orderRes) => {

  return axios.get(orderRes.redirect_url).then(({ data }) => {
    // const params = {
    //   payment_details: [
    //     {
    //       amount: data.amount,
    //       currency: data.currency,
    //       payment_mode: 'PAY_ONLINE',
    //     },
    //   ],
    //   redirect_url: `${window.location.origin}/${country}/${language}`,
    //   transaction_id: data.transaction_id,
    // };
    // return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/process`, params).then(({ data: payData }) => {
    //
    //   return { orderRes, data, payData }
    // });
    return { orderRes, data };
  });
};

//Create Order Second step.
const createOrder = () => {
  return axios.post(`${constants.CART_API_URL}/api/v1/cart/checkout`).then(({ data }) => {
    return transactionApi(data);
  });
};

//Create Order First step.
const createOrderApi = (defaultAddrId) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/view`, { address_id: defaultAddrId }).then(({ data }) => {
    return createOrder(data);
  });
};

const doPaymentApi = (params) => {
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/process`, params).then(({ data }) => {
    return { data }
  });
}

const getRedirectApi = (params) => {
  return axois.get(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/gateway/callback/${params.encryptedString}`)
}

const saveCardApi = (params) => {
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/save_card`, params).then(({ data }) => {
    return { data }
  });
}

const makeProcessRequest = (params) => {
  params.redirect_url = `${window.location.origin}/${country}/${language}`;
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/process`, params).then(({data}) => data);
}

export default { createOrderApi, doPaymentApi, saveCardApi, makeProcessRequest, getRedirectApi };
