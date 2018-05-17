import { combineReducers } from 'redux';
import { reducer as searchReducer } from './search';
import { reducer as productReducer } from './product';
import { reducer as shippingAddrReducer } from './cam/address';

export default combineReducers({
  searchReducer,
  productReducer,
  shippingAddrReducer,
});
