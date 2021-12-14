import axios from "axios";
import { productTypes } from "../actions/actionTypes";

export const getAllProduct = () => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.get("http://localhost:8080/product/");
    console.log("check res:", res);
  } catch (error) {
    console.log(error);
    dispatch(getProductFail);
    return false;
  }
  dispatch(getProductSuccess(res.data));
  return true;
};

export const getProductSuccess = (data) => ({
    type: productTypes.GET_ALL_PRODUCT_SUCCESS,
    data: data
  }
);

// export const getProductSuccess = (data) => ({
//   type: productTypes.GET_ALL_PRODUCT_SUCCESS,
//   data: data
// });

export const getProductFail = () => ({
  type: productTypes.GET_ALL_PRODUCT_FAIL,
  data: "error",
});
