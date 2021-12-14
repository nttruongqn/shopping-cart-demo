import { combineReducers } from "redux";
import { userTypes } from "../actions/actionTypes";

const initial = {
  email: null,
  isLogin: false,
  user: "",
};

const login = (state = initial, action) => {

  switch (action.type) {
    case userTypes.SET_EMAIL_LOGIN: {
      return {
        ...state,
        email: action.email,
      };
    }
    case userTypes.LOGIN_SUCCESS: {
      console.log("data:", action.data);

      return {
        ...state,
        isLogin: true,
        userN: action.data,
      };
    }
    case userTypes.LOGIN_FAIL: {
      return {
        ...state,
        isLogin: false,
      };
    }
    case userTypes.RESET_IS_LOGIN: {
      return {
        ...state,
        isLogin: null,
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
  login,
});
