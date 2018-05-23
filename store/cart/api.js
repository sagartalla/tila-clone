import _ from 'lodash';
import { cartServiceInstance } from '../helper/services';

const getOrderDetailsApi = () => {
  return cartServiceInstance.put('/api/v1/cart/view', {}).then(({ data }) => {
    return { data };
  });
};

export default { getOrderDetailsApi };