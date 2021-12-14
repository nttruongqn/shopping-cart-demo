import React from "react";
import "./RegisterComponent.scss";

const RegisterComponent = ({
  setE,
  setP,
  setCP,
  setF,
  setL,
  setA,
  setPn,
  notificationRegister,
  registerSubmit,
}) => {
  return (
    <div className="form-container">
      <form className="form-register">
        <h1>Register</h1>
        <p>{notificationRegister}</p>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email"
            onChange={(event) => setE(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Nhập password"
            onChange={(event) => setP(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password: </label>
          <input
            type="password"
            name="confirmPass"
            placeholder="Nhập lại password"
            onChange={(event) => setCP(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            placeholder="Nhập Họ"
            onChange={(event) => setF(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            placeholder="Nhập tên"
            onChange={(event) => setL(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address: </label>
          <input
            type="text"
            name="address"
            placeholder="Nhập địa chỉ"
            onChange={(event) => setA(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number: </label>
          <input
            type="text"
            name="phonnumber"
            placeholder="Nhập số điện thoại"
            onChange={(event) => setPn(event.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={() => registerSubmit()}>
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
