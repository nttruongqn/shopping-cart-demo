const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cart = new Schema({
  id_user: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  products: {
    type: [
      {
        title: String,
        description: String,
        image: String,
        price: Number,
        availablesSizes: [String],
        count:Number,
        _id: String,
      },
    ],
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model("cart", cart);
