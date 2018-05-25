import _ from 'lodash';
import { cartServiceInstance } from '../helper/services';

const getCartDetailsApi = () => {
  return cartServiceInstance.put('/api/v1/cart/view', {}).then(({ data }) => {
    return { data };
  });
};

const addToCart = (params) => {
  return cartServiceInstance.post('/api/v1/cart/add', params)
}

export default { getCartDetailsApi, addToCart };