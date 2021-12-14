const express = require("express");
let router = express.Router();
const { addToCart, getAll, update ,deleteC} = require("../controllers/cartController");


let cartRouter = (app) => {
    router.post('/addtocard', addToCart);
    router.get('/:id_user', getAll);
    router.post('/update', update);
    router.post('/delete',deleteC);
//   router.post("/login", loginAccount);
  return app.use("/cart", router);
};

module.exports = { cartRouter };