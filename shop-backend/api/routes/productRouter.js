const express = require("express");
let router = express.Router();
const { getAllProduct, newProduct } = require("../controllers/productController");


let productRouter = (app) => {
    router.get("/", getAllProduct);
    router.post("/add",newProduct);
//   router.post("/login", loginAccount);
  return app.use("/product", router);
};

module.exports = { productRouter };
