import { combineReducers } from 'redux';
import { reducer as searchReducer } from './search';
import { reducer as productReducer } from './product';

export default combineReducers({
  searchReducer,
  productReducer,
});
