const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRouter } = require("./api/routes/userRouter");
const { productRouter } = require("./api/routes/productRouter");
const { cartRouter } = require("./api/routes/cartRouter");
const { billRouter } = require("./api/routes/billRouter");
require("dotenv").config();

let port = process.env.PORT || 2805;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://localhost/demo-shop-js")
  .then((data) => console.log("kết nối database thành công"))
  .catch((err) => console.log("kết nối database thất bại"));

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});


userRouter(app);
productRouter(app);
cartRouter(app);
billRouter(app);

app.listen(port, () => {
  console.log("server kết nối tại cổng", port);
});
