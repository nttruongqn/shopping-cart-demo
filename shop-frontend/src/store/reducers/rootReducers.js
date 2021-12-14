import { combineReducers } from "redux";
import userReducers from "./userReducers";
import productReducers from "./productReducers";
import cartReducers from "./cartReducers";

export default combineReducers({
  userReducers,
  productReducers,
    cartReducers
 
  
});
