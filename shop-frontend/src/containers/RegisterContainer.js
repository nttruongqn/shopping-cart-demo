import axios from "axios";
import React, { Component } from "react";
import FooterComponent from "../components/Footer/FooterComponent";
import HeaderComponent from "../components/Header/HeaderComponent";
import RegisterComponent from "../components/Register/RegisterComponent";

export default class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      confirmPass: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      notificationRegister: "",
    };
  }

  componentDidMount() {}

  isvalidFirstName = (firstName) => {
    if (firstName === "") return false;
    return true;
  };
  isvalidLastName = (lastname) => {
    if (lastname === "") return false;
    return true;
  };
  isvalidPassword = (pass) => {
    if (pass.length < 6) return false;
    return true;
  };
  isvalidConfirm = (password, confirm) => {
    if (confirm != password) return false;
    return true;
  };
  isvalidEmail = (email) => {
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1)
      return false;
    return true;
  };

  registerSubmit = async () => {
    if (!this.isvalidEmail(this.state.email)) {
      this.setState({ notificationRegister: "Email trống hoặc không hợp lệ" });
      return;
    } else {
      this.setState({ notificationRegister: "" });
    }
    if (!this.isvalidPassword(this.state.pass)) {
      this.setState({ notificationRegister: "Mật khẩu không dưới 6 ký tự" });
      return;
    } else {
      this.setState({ notificationRegister: "" });
    }
    if (!this.isvalidConfirm(this.state.pass, this.state.confirmPass)) {
      this.setState({ notificationRegister: "Mật khẩu không khớp" });
      return;
    } else {
      this.setState({ notificationRegister: "" });
    }
    if (!this.isvalidFirstName(this.state.firstName)) {
      this.setState({ notificationRegister: "Firstname trống" });
      return;
    } else {
      this.setState({ notificationRegister: "" });
    }
    if (!this.isvalidLastName(this.state.lastMame)) {
      this.setState({ notificationRegister: "Lastname trống" });
      return;
    } else {
      this.setState({ notificationRegister: "" });
    }
    try {
      await axios.post("http://localhost:8080/user/register/", {
        email: this.state.email,
        password: this.state.pass,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phone_number: this.state.phoneNumber,
      });
    } catch (err) {
      console.log(err);
      if (err.response.data.msg === "Email already exist")
        this.setState({ notificationRegister: "Email already exist" });
      else this.setState({ notificationRegister: "Đăng Ký Thất Bại" });
      return;
    }
    this.setState({ notificationRegister: "Đăng Ký Thành Công" });
  };

  render() {
    console.log("check state", this.state);
    return (
      <>
      <HeaderComponent
          isLogin={this.props.isLogin}
          logout={() => this.props.usrActions.logout()}
          history={this.props.history}
        />

        <RegisterComponent
          setE={(x) => this.setState({ email: x })}
          setP={(x) => this.setState({ pass: x })}
          setCP={(x) => this.setState({ confirmPass: x })}
          setF={(x) => this.setState({ firstName: x })}
          setL={(x) => this.setState({ lastName: x })}
          setA={(x) => this.setState({ address: x })}
          setPn={(x) => this.setState({ phoneNumber: x })}
          notificationRegister={this.state.notificationRegister}
          registerSubmit={this.registerSubmit}
        />
        <FooterComponent />
      </>
    );
  }
}
