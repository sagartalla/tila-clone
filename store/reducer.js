import { combineReducers } from 'redux';
import { reducer as searchReducer } from './search';
import { reducer as productReducer } from './product';
import { reducer as shippingAddrReducer } from './cam/address';
import { reducer as ordersReducer } from './cam/orders';

export default combineReducers({
  searchReducer,
  productReducer,
  shippingAddrReducer,
  ordersReducer,
});
