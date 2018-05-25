import { orderInstance } from '../helper/services';


const getOrderStatusDetails = (order_id) => {
  debugger;
  return orderInstance.get('/api/v1/customer/order/details/'+ order_id ).then(({ data }) => {
    debugger;
    return  {data};
  });
};


export default { getOrderStatusDetails };
