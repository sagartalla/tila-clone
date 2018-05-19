import { orderServiceInstance } from '../../helper/services';

const getOrderHistory = () => orderServiceInstance.get('/api/v1/customer/order/history');

export default { getOrderHistory };