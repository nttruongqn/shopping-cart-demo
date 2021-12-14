"use strict";
const userModel = require("../models/userModel");
const randomString = require("randomstring");
const nodemailer = require("../utils/nodemailer");
const opt = require("../utils/otp");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { json } = require("body-parser");

let registerUser = async (req, res) => {
  let { email, password, firstName, lastName, address, phone_number } =
    req.body;
  if (
    // typeof req.body.email === "undefined" ||
    // typeof req.body.password === "undefined" ||
    // typeof req.body.firstName === "undefined" ||
    // typeof req.body.lastName === "undefined" ||
    // typeof req.body.address === "undefined" ||
    // typeof req.body.phone_number === "undefined"
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !address ||
    !phone_number
  ) {
    return res.status(422).json({ msg: "Vui lòng nhập đầy đủ thông tin" });
  }

  if (
    (email.indexOf("@") === -1 && email.indexOf(".") === -1) ||
    password.length < 6
  ) {
    res.status(422).json({
      msg: "Thông tin không hợp lệ",
    });
  }

  let timKiemUser = null;
  try {
    timKiemUser = await userModel.find({
      email: email,
    });
    console.log("check tim kiem user: ", timKiemUser);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  if (timKiemUser && timKiemUser.length > 0) {
    return res.status(409).json({
      msg: "Email already exist",
    });
  }

  const token = randomString.generate();
  let sendEmail = await nodemailer.sendEmail(email, token);
  if (!sendEmail) {
    return res.status(500).json({
      msg: "Gởi mail thất bại",
    });
  }

  password = bcrypt.hashSync(password, 10);
  const newUser = new userModel({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    address: address,
    phone_number: phone_number,
    token: token,
  });
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
  return res.status(201).json({ msg: "success" });
};

let verifyAccount = async (req, res) => {
  let token = req.params.token;
  if (!token) {
    return res.status(402).json({
      msg: "Input Không hợp lệ",
    });
  }
  let timKiemToken = "";
  try {
    timKiemToken = await userModel.findOne({
      token: token,
    });
    console.log("timkiemtoken: ", timKiemToken);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  if (timKiemToken === null) {
    return res.status(402).json({
      msg: "không tìm thấy token",
    });
  }
  try {
    await userModel.findByIdAndUpdate(
      timKiemToken._id,
      { $set: { is_verify: true } },
      { new: true }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "loi server",
    });
  }

  return res.status(200).json({
    msg: "OK",
    token: token,
  });
};

let loginAccount = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(402).json("input khong hop le");
  }
  let timKiemUser = null;
  try {
    timKiemUser = await userModel.findOne({
      email: email,
    });
    console.log("timKiemUser: ", timKiemUser);
  } catch (error) {
    return res.status(500).json({
      err: error,
    });
  }
  if (timKiemUser == null) {
    return res.status(402).json({
      msg: "email khong chinh xac",
    });
  }
  if (!timKiemUser.is_verify) {
    return res.status(402).json({
      msg: "user chua dang ky",
    });
  }
  if (!bcrypt.compareSync(password, timKiemUser.password)) {
    return res.status(402).json({
      msg: "mat khau khong chinh xac",
    });
  }

  let token = jwt.sign(
    {
      email: email,
      iat: Math.floor(Date.now() / 1000) - 60 * 30,
    },
    "abcdef"
  );

  return res.status(200).json({
    msg: "success",
    token: token,
    user: {
      email: timKiemUser.email,
      firstName: timKiemUser.firstName,
      lastName: timKiemUser.lastName,
      address: timKiemUser.address,
      phone_number: timKiemUser.phone_number,
      id: timKiemUser._id,
    },
  });
};

let requestForgotPassword = async (req, res) => {
  let email = req.params.email;
  if (!email) {
    return res.status.json({
      msg: "input khong hop le",
    });
  }
  let userFind = null;
  try {
    userFind = await userModel.findOne({
      email: email,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  if (userFind == null) {
    return res.status(402).json({
      msg: "khong tim thay email",
    });
  }
  if (!userFind.is_verify) {
    return res.status(402).json({
      msg: "tai khoan chua dang ky",
    });
  }
  let token = opt.generateOTP();
  let sendEmail = nodemailer.sendEmailForgotPassword(email, token);
  if (!sendEmail) {
    return res.status(500).json({
      msg: "goi email that bai",
    });
  }
  userFind.token = token;
  try {
    await userFind.save();
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }

  return res.status(200).json({
    msg: "success",
    email: email,
  });
};

let verifyForgotPassword = async (req, res) => {
  let { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(402).json({
      msg: "input khong hop le",
    });
  }
  let userFind = null;
  try {
    userFind = await userModel.findOne({
      email: email,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  if (userFind == null) {
    return res.status(402).json({
      msg: "khong tim thay email",
    });
  }
  if (userFind.token != otp) {
    return res.status(402).json({
      msg: "ma otp sai",
    });
  }
  return res.status(200).json({
    msg: "Success",
    otp: otp,
  });
};

let forgotPassword = async (req, res) => {
  let { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(402).json({
      msg: "Input khong hop le",
    });
  }
  let userFind = null;
  try {
    userFind = await userModel.findOne({
      email: email,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }

  if (userFind == null) {
    return res.status(402).json({
      msg: "khong tim thay email",
    });
  }
  if (userFind.token !== otp) {
    return res.status(402).json({
      msg: "ma otp khong chinh xac",
    });
  }

  userFind.password = bcrypt.hashSync(newPassword, 10);
  try {
    await userFind.save();
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }

  return res.status(200).json({
    msg: "success",
  });
};

let updateInfor = async (req, res) => {
  let { email, firstName, lastName, address, phone_number } = req.body;
  if (!email || !lastName || !address || !phone_number) {
    return res.status(402).json({
      msg: "input khong hop le",
    });
  }

  let userFind;
  try {
    userFind = await userModel.findOne({
      email: email,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  if (userFind == null) {
    return res.status(402).json({ msg: "email khong dung" });
  }

  userFind.firstName = firstName;
  userFind.lastName = lastName;
  userFind.address = address;
  userFind.phone_number = phone_number;

  try {
    await userFind.save();
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
  let token = jwt.sign({ email: email }, "abcdef");
  return res.status(200).json({
    msg: "success",
    token: token,
    user: {
      email: userFind.email,
      firstName: userFind.firstName,
      lastName: userFind.lastName,
      addresss: userFind.address,
      phone_number: userFind.phone_number,
      id: userFind._id,
    },
  });
};

let updatedPassword = async (req, res) => {
  let { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(402).json({
      msg: "input khong hop le",
    });
  }

  let userFind;
  try {
    userFind = await userModel.findOne({
      email: email,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  if (userFind === null) {
    return res.status(200).json({
      msg: "email khong chinh xac",
    });
  }
  if (!bcrypt.compareSync(oldPassword, userFind.password)) {
    return res.status(402).json({
      msg: "mat khau khong chinh xac",
    });
  }
  userFind.password = bcrypt.hashSync(newPassword, 10);
  try {
    await userFind.save();
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  return res.status(200).json({
    msg: "success",
  });
};

let getDetailUser = async (req, res) => {
  let id = req.params.id;
  let user;
  try {
    user = await userModel.findOne({ _id: id });
  } catch (error) {
    return res.status(500).json({
      msg:error
    })
  }
  if (res === null) {
    return res.status(402).json({ msg: "Khong tim thay user" })
  }
  return res.status(200).json({
    msg: "success",
    data:user
  })
};

module.exports = {
  registerUser,
  verifyAccount,
  loginAccount,
  requestForgotPassword,
  verifyForgotPassword,
  forgotPassword,
  updateInfor,
  updatedPassword,
  getDetailUser
};
