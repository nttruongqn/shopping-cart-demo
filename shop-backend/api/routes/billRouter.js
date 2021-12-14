const express = require("express");
let router = express.Router();
const { addBill } = require("../controllers/billController");


let billRouter = (app) => {
    router.post('/add', addBill);
   
//   router.post("/login", loginAccount);
  return app.use("/bill", router);
};

module.exports = { billRouter };