import {combineReducers} from 'redux';
import {RootNavigator} from '../navigations/AppNavigation';
import {auth} from '../Core/onboarding/redux/auth';
import {chat} from '../Core/chat/redux';
import {orders} from '../Core/delivery/redux';
import {cart} from '../Core/cart/redux/reducers';
import {checkout} from '../Core/payment/redux/checkout';
import {vendor} from '../Core/vendor/redux';


const AppReducer = combineReducers({
  auth,
  chat,
  cart,
  orders,
  checkout,
  vendor,
});

export default AppReducer;
