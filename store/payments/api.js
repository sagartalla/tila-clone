import { orderInstance, transacationRedirectUrlInstance, paymentInstance, cartServiceInstance } from '../helper/services';

//Create Order Third step.
const transactionApi = (orderRes) => {
  return transacationRedirectUrlInstance.get(orderRes.redirect_url).then(({ data }) => {
    return { orderRes, data }
  })
};

//Create Order Second step.
const createOrder = () => {
  return orderInstance.post('/api/v1/order/purchase').then(({ data }) => {
    return transactionApi(data);
  });
};

//Create Order First step.
const createOrderApi = (defaultAddrId) => {
  return cartServiceInstance.put('/api/v1/cart/view', {'address_id': defaultAddrId }).then(({ data }) => {
    return createOrder(data);
  });  
};

const doPaymentApi = (params) => {
  return paymentInstance.post('/fpts/transaction/process', params).then(({ data }) => {
    return { data }
  });
}

export default { createOrderApi, doPaymentApi };
