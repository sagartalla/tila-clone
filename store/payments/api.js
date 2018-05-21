import { orderInstance, transacationRedirectUrlInstance, paymentInstance } from '../helper/services';


const transactionApi = (orderRes) => {
  return transacationRedirectUrlInstance.get(orderRes.redirect_url).then(({ data }) => {
    return { orderRes, data }
  })
};

const createOrderApi = (params) => {
  return orderInstance.post('/api/v1/order/test/create', params).then(({ data }) => {
    return transactionApi(data);
  });
};

const doPaymentApi = (params) => {
  return paymentInstance.post('/fpts/transaction/process', params).then(({ data }) => {
    return { data }
  });
}

export default { createOrderApi, doPaymentApi };
