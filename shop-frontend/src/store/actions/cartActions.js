import axios from "axios";
import storeConfig from "../../config/storageConfig";
import { cartTypes } from "../actions/actionTypes";

export const addToCart = (product) => async (dispatch, getState) => {
  if (getState().userReducers.login.isLogin) {
    let res;
    try {
      res = await axios.post("http://localhost:8080/cart/addtocard", {
        id_user: storeConfig.getUser().id,
        products: [product],
      });
    } catch (err) {
      console.log(JSON.stringify(err.response));
      return;
    }
  } else {
    storeConfig.addProductToCart(product);
  }
};

export const setCart = (data) => ({
  type: cartTypes.SET_CART,
  data,
});
export const getCart = () => async (dispatch, getState) => {
  let cart = null;
  cart = storeConfig.getCart();
  if (cart !== null) {
    dispatch(setCart(cart));
    return;
  }
  if (storeConfig.getUser() === null) return;
  let id_user = storeConfig.getUser().id;
  try {
    cart = await axios.get("http://localhost:8080/cart/" + id_user);
  } catch (err) {
    console.log(err);
    return;
  }
  if (cart.data.data !== null) {
    dispatch(setCart(cart.data.data.products));
  }
};

export const deleteProductInCart =
  (id_product) => async (dispatch, getState) => {
    if (!getState().userReducers.login.isLogin) {
      storeConfig.deleteProductInCart(id_product);
    } else {
      try {
        await axios.post("http://localhost:8080/cart/delete", {
          id_user: storeConfig.getUser().id,
          id_product: id_product,
        },()=>{console.log("success")});
      } catch (err) {
        console.log(err.response);
      }
    }
    let id_user = storeConfig.getUser().id;
    console.log("check id_user", id_user);
    console.log("id_product", id_product);
    dispatch(getCart());
  };


  
  export const payment = ( name, address, phone,total) => async (dispatch, getState) => {
    let res = null
    try {
        console.log(total);
        console.log(address)
        console.log(phone);
        console.log(name)
        res = await axios.post('http://localhost:8080/bill/add', {
            id_user: storeConfig.getUser().id,
            address: address,
            phone: phone,
            name: name,
            total: total,
            email: storeConfig.getUser().email
        })
    }
    catch(err) { 
        dispatch(paymentFail())
        console.log(err.response)
        dispatch(resetPayment())
        return
    }
    dispatch(paymentSuccess())
    dispatch(resetPayment())
    dispatch(getCart())
}

export const paymentSuccess = () => ({
  type: cartTypes.PAYMENT_SUCCESS
})
export const paymentFail = () => ({
  type: cartTypes.PAYMENT_FAIL
})
export const resetPayment = () => ({
  type: cartTypes.RESET_PAYMENT
})