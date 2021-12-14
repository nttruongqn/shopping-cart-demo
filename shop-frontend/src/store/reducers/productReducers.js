import { combineReducers } from "redux";
import { productTypes } from "../actions/actionTypes";

const initial = {
  listProduct: [],
};

const product = (state = initial, action) => {
  switch (action.type) {
    case productTypes.GET_ALL_PRODUCT_SUCCESS: {
      console.log("check dt product action:", action.data);
      return {
        ...state,
        listProduct: action.data,
      };
    }
    case productTypes.GET_ALL_PRODUCT_FAIL: {
      return {
        ...state,
        listProduct: [],
      };
    }
    default: {
      return state;
    }
  }
};

// const forgotPassword = (state = {}, action) => {
//   switch (
//     action.types)
//   }
// };

export default combineReducers({
  product,
});
