import { combineReducers } from 'redux';
import * as allReducer from './shoppingcart/shoppingCartReducers';
import loginReducer from './login/loginReducer';

const rootReducer = combineReducers({
  fetchedData: allReducer.fetchProductsReducer,
  loginInfo: loginReducer,
});

export default rootReducer;
