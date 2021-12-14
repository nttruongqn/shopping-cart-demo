const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bill = new Schema({
  id_user: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: {
    type: [
      {
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
        _id: String,
      },
    ],
    required: true,
    minlength: 1,
  },
  total: Number,
  address: String,
  phone: String,
  name: String,
  issend: {
    type: String,
    default: "99",
  },
});
module.exports = mongoose.model("bill", bill);
