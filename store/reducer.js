import { combineReducers } from 'redux';
import { reducer as searchReducer } from './search';
import { reducer as productReducer } from './product';
import { OverlayReducer } from '../pages/Overlay/OverlayReducer';

export default combineReducers({
  searchReducer,
  productReducer,
  OverlayReducer,
});
