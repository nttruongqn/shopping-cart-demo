const bill = require("../models/billModel");
const cart = require("../models/cartModel");

exports.addBill = async (req, res) => {
  if (
    typeof req.body.id_user === "undefined" ||
    typeof req.body.address === "undefined" ||
    typeof req.body.phone === "undefined" ||
    typeof req.body.name === "undefined" ||
    typeof req.body.total === "undefined" ||
    typeof req.body.email === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  const { id_user, address, total, phone, name, email } = req.body;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ id_user: id_user });
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "user not found" });
    return;
  }

  const new_bill = new bill({
    id_user: id_user,
    products: cartFind.products,
    address: address,
    phone: phone,
    name: name,
    total: total,
  });
  try {
    await cartFind.remove();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("cart remove fail");
    return;
  }
  try {
    new_bill.save();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("save bill fail");
    return;
  }
  res.status(201).json({ msg: "success" });
};
