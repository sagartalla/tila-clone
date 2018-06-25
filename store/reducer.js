import { combineReducers } from 'redux';
import { reducer as searchReducer } from './search';
import { reducer as productReducer } from './product';
import { reducer as shippingAddrReducer } from './cam/address';
import { reducer as ordersReducer } from './cam/orders';
import { reducer as singleOrderReducer } from "./order";
import { reducer as cartReducer } from "./cart";
import { reducer as paymentsReducer } from './payments';
import { reducer as authReducer } from './auth';
import { reducer as thankyouReducer } from './thankyou';
import { reducer as megamenuReducer } from './megamenu';
import { reducer as personalDetailsReducer } from './cam/personalDetails';
import { reducer as wishlistReducer } from './cam/wishlist';
import { reducer as vaultReducer } from './cam/userVault';
import { reducer as messagesReducer } from './cam/messages';

export default combineReducers({
  searchReducer,
  productReducer,
  shippingAddrReducer,
  ordersReducer,
  singleOrderReducer,
  cartReducer,
  paymentsReducer,
  authReducer,
  thankyouReducer,
  megamenuReducer,
  personalDetailsReducer,
  wishlistReducer,
  vaultReducer,
  messagesReducer
});
