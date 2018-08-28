import axios from 'axios';
import constants from '../helper/constants';

//Create Order Third step.
const transactionApi = (orderRes) => {
  return axios.get(orderRes.redirect_url).then(({ data }) => {
    // return { orderRes, data }

    const params = {
      "payment_details": [
        {
          "amount": data.amount,
          "currency": data.currency,
          "payment_mode": "PAY_ONLINE"
        }
      ],
      "transaction_id": data.transaction_id
    }


    return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/process`, params).then(({ data: payData }) => {

      return { orderRes, data, payData }
    });
  })
};

//Create Order Second step.
const createOrder = () => {
  return axios.post(`${constants.ORDERS_API_URL}/api/v1/order/purchase`).then(({ data }) => {
    return transactionApi(data);
  });
};

//Create Order First step.
const createOrderApi = (defaultAddrId) => {
  return axios.put(`${constants.CART_API_URL}/api/v1/cart/view`, { 'address_id': defaultAddrId }).then(({ data }) => {
    return createOrder(data);
  });
};

const doPaymentApi = (params) => {
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/process`, params).then(({ data }) => {
    return { data }
  });
}

const saveCardApi = (params) => {
  return axios.post(`${constants.TRANSACTIONS_API_URL}/fpts/transaction/save_card`, params).then(({ data }) => {
    return { data }
  });
}

export default { createOrderApi, doPaymentApi, saveCardApi };
