"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
        type: String,
        required: [true, 'nhập user'],
        index: true,
        lowercase: true,
      match:[/\S+@\S+\.\S+/,'không có hiệu lực']
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  is_verify: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
