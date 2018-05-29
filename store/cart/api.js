import _ from 'lodash';
import { cartServiceInstance } from '../helper/services';

const getCartDetailsApi = () => {
  return cartServiceInstance.put('/api/v1/cart/view', {}).then(({ data }) => {
    return { data };
  });
};

const addToCart = (params) => {
  return cartServiceInstance.post('/api/v1/cart/add', params);
}

const removeCartItemApi = (params) => {
  return cartServiceInstance.put('api/v1/cart/delete', params).then(({ data }) => {
    
    //calling this function because to get cart details again.
    return getCartDetailsApi();
  })
}

export default { getCartDetailsApi, addToCart, removeCartItemApi };