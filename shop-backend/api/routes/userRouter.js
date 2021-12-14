const express = require("express");
const {
  registerUser,
  verifyAccount,
  loginAccount,
  requestForgotPassword,
  verifyForgotPassword,
  forgotPassword,
  updateInfor,
  updatedPassword,
  getDetailUser,
} = require("../controllers/userController");
const { verify } = require("../utils/auth");

let router = express.Router();

let userRouter = (app) => {
  router.post("/register", registerUser);
  router.get("/register/verify/:token", verifyAccount);
  router.post("/login", loginAccount);
  router.get("/request/forgot-password/:email", requestForgotPassword);
  router.post("/verify/forgot-password", verifyForgotPassword);
  router.get("/forgot-password", forgotPassword);
  router.post("/verify/forgot-password", verifyForgotPassword);
  router.post("/forgot-password", forgotPassword);
  router.post("/update-infor", updateInfor);
  router.post("/update-password", updatedPassword);
  router.post("/auth", verify);
  router.get("/getUserById/:id",getDetailUser);


  return app.use("/user", router);
};

module.exports = { userRouter };
