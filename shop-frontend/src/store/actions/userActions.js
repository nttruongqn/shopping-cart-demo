import axios from "axios";
import storeConfig from "../../config/storageConfig";
import { userTypes } from "../actions/actionTypes";

export const loginSuccess = (token, user) => async (dispatch, getState) => {
  storeConfig.setUser(user);
  storeConfig.setToken(token);
  dispatch(setLoginSuccess());

  let cart = storeConfig.getCart();
  storeConfig.removeCart();
  if (cart !== null) {
    let res;
    try {
      res = await axios.post("http://localhost:8080/cart/addtocard", {
        id_user: user.id,
        products: cart,
      });
    } catch (err) {
      console.log(JSON.stringify(err.response));
      return;
    }
  }
};

export const auth = () => async (dispatch, getState) => {
  if (storeConfig.getUser() === null) {
    dispatch(setLoginFail());
    return false;
  }

  let email = storeConfig.getUser().email;
  let token = storeConfig.getToken();
  let res;
  try {
    res = await axios.post("http://localhost:8080/user/auth", {
      email: email,
      token: token,
    });
  } catch (error) {
    dispatch(setLoginFail());
    return false;
  }
  dispatch(setLoginSuccess());
  return true;
};

export const resetIsLogin = () => ({
  type: userTypes.RESET_IS_LOGIN,
});
export const logout = () => (dispatch, getState) => {
  storeConfig.clear();
  dispatch(setLoginFail());
};

export const setLoginSuccess = () => ({
  type: userTypes.LOGIN_SUCCESS,
  data: storeConfig.getUser().lastName,
});

export const setLoginFail = () => ({
  type: userTypes.LOGIN_FAIL,
  data: "login fail",
});

export const setEmail = (email) => ({
  type: userTypes.SET_EMAIL_LOGIN,
  email,
});
