const jwt = require("jsonwebtoken");

let verify = async (req, res) => {
  let { email, token } = req.body;
  if (!email || !token) {
    return res.status(402).json({
      msg: "input khong hop le",
    });
  }
  try {
    let decoded = jwt.verify(token, "abcdef");
    console.log("decoded: ", decoded);
    if (decoded.email == email) {
      return res.status(200).json({
        msg: "success",
      });
    }
    res;
  } catch (error) {
    return res.status(400).json({ msg: "unsucess" });
  }
  return res.status(400).json({ msg: "unsucess" });
};

module.exports = { verify };
