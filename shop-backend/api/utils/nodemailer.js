const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nttruongqn@gmail.com",
    pass: "wsqhqspbsyavdqvu",
  },
});

let sendEmail = async (email, token) => {
  let mailOptions = {
    from: '"SHOOPER 👻" <Shopchưa đặt tên>', // sender address
    to: email, // list of receivers
    subject: "Account Verification Token", // Subject line
    text: "Hello my friend",
    html:
      "<b>verify your account</b>" +
      " <br/>" +
      "<span>Please verify your account by clicking the link</span>" +
      "<br/>" +
      "<span>http://localhost:3000/confirm/" +
      token +
      "</span>",
  };
  try {
    let send = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

let sendEmailForgotPassword = async (email, token) => {
  let mailOptions = {
    from: '"SHOOPER 👻" <Shop chưa đặt tên>', // sender address
    to: email, // list of receivers
    subject: "Forgot password Verification Token", // Subject line
    html:
      "<b>Forgot password</b>" +
      " <br/>" +
      "<span>Please enter OTP below</span>" +
      "<br/>" +
      "<span>" +
      token +
      "</span>",
  };
  try {
    let send = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};
let sendMailConfirmPayment = async (email, token) => {
  let mailOptions = {
    from: '"SHOOPER 👻"" <Shop chưa đặt tên>', // sender address
    to: email, // list of receivers
    subject: "Payment Verification Token", // Subject line
    text: "Hello my friend",
    html:
      "<b>verify your account</b>" +
      " <br/>" +
      "<span>Please verify your account by clicking the link</span>" +
      "<br/>" +
      "<span>http://localhost:3000/payment/" +
      token +
      "</span>",
  };
  try {
    let send = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

module.exports = { sendEmail, sendEmailForgotPassword, sendMailConfirmPayment };
