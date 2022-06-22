import { combineReducers } from  'redux';
import {productReducer} from './productstore/productReducer';
export default combineReducers({
    products: productReducer,
   
})