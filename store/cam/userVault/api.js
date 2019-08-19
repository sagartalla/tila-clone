import axios from 'axios';
import constants from '../../helper/constants';

const getCardResultsApi = () => {
  return axios.get(`${constants.VAULT_API_URL}/api/v1/user/wallet`).then(({ data }) => {
    return { data };
  });
};
const getCheckoutOptionsApi = params => {
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/instant_checkout_options`, params)
};
const getWalletTransactions = () => {
  return axios.get(`${constants.VAULT_API_URL}/api/v1/user/wallet/transactions?page=0&size=10`).then(({data}) => {
    return data;
  });
};

const addCardDetailsApi = (params) => {
  return axios.post(`${constants.VAULT_API_URL}/api/v1/vault/add`, params).then(({ data }) => {
    //after successfully added, get all card details again.
    return getCardResultsApi();
  });
}

const makeCardDefaultApi = (card_token) => {
  return axios.put(`${constants.VAULT_API_URL}/api/v1/user/wallet/defaultCard/` + card_token).then(({ data }) => {

    //after successfully added, get all card details again.
    return getCardResultsApi();
  });
}

const deleteCardApi = (card_token) => {
  return axios.delete(`${constants.VAULT_API_URL}/api/v1/user/wallet/deleteCard/${card_token}`).then(({ data }) => {
    //after successfully added, get all card details again.
    return getCardResultsApi();
  });
}

export default { getCardResultsApi, addCardDetailsApi, makeCardDefaultApi, deleteCardApi, getWalletTransactions, getCheckoutOptionsApi };
