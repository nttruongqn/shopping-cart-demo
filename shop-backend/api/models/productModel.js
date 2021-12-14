const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  title: String,
  description: String,
  image: String,
  price: Number,
  availablesSizes: [String],
});

module.exports = mongoose.model("product", productSchema);
