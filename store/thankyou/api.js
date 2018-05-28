import { orderServiceInstance } from '../helper/services';


const getOrderStatusDetails = (order_id) => {
  return orderServiceInstance.get('/api/v1/customer/order/details/' + order_id).then(({ data }) => {
    return { data };
  });
};


export default { getOrderStatusDetails };
