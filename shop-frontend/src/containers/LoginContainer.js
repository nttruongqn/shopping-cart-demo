import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginComponent from "../components/Login/LoginComponent";
import * as userActions from "../store/actions/userActions";

import RegisterContaier from "./RegisterContainer";

export class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailLogin: "",
      passLogin: "",
      notificationLogin: "",
    };
  }

  componentDidMount() {}

  isvalidEmail = (email) => {
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1)
      return false;
    return true;
  };

  loginSubmit = async () => {
    if (!this.isvalidEmail(this.state.emailLogin)) {
      this.setState({ notificationLogin: "Email invalid" });
      return;
    } else {
      this.setState({ notificationLogin: "" });
    }
    let res;
    try {
      res = await axios.post("http://localhost:8080/user/login", {
        email: this.state.emailLogin,
        password: this.state.passLogin,
      });
      console.log("res:", res);
    } catch (err) {
      if (err.response !== undefined) {
        if (err.response.data.msg === "user chua dang ky")
          this.setState({
            notificationLogin:
              "Tài Khoản Chưa Được Kích Hoạt, Vui Lòng Vào mail Để Kích Hoạt",
          });
        else {
          this.setState({ notificationLogin: "Email or password invalid" });
        }
      } else {
        this.setState({ notificationLogin: "Some thing went wrong" });
      }
      return;
    }
    this.props.usrActions.loginSuccess(res.data.token, res.data.user);
    this.props.history.push("/");
  };

  render() {
    console.log("check state", this.state);
    console.log("check props", this.props);

    return (
      <LoginComponent
        setEL={(x) => this.setState({ emailLogin: x })}
        setPL={(x) => this.setState({ passLogin: x })}
        loginSubmit={this.loginSubmit}
        notificationLogin={this.state.notificationLogin}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.userReducers.login.isLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    usrActions: bindActionCreators(userActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
