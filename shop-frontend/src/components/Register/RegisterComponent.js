import React from "react";
import "./RegisterComponent.css";

const RegisterComponent = ({ setE, setP, setCP, setF, setL, setA, setPn, notificationRegister,registerSubmit }) => {
  return (
    <form>
      <h1>Register</h1>
      <p>{ notificationRegister}</p>
      <div className="form-group">
        <label>Email: </label>
        <input
          type="email"
          name="email"
          onChange={(event) => setE(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          onChange={(event) => setP(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password: </label>
        <input
          type="password"
          name="confirmPass"
          onChange={(event) => setCP(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          onChange={(event) => setF(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          onChange={(event) => setL(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Address: </label>
        <input
          type="text"
          name="address"
          onChange={(event) => setA(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Phone Number: </label>
        <input
          type="text"
          name="phonnumber"
          onChange={(event) => setPn(event.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick = {()=> registerSubmit()}>Đăng ký</button>
      </div>
    </form>
  );
};

export default RegisterComponent;
