import React from "react";
import "./LoginComponent.scss";

const LoginComponent = ({setEL,setPL,loginSubmit, notificationLogin}) => {
  return (
    <div className="form-container">
      <form className="form-login">
        <h1>Login</h1>
        <p>{notificationLogin}</p>
        <div className="form-group">
          <label>Email: </label>
          <input type="text" name="email" placeholder="Nhập email" onChange={(e)=>setEL(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input type="password" name="password" placeholder="Nhập password" onChange={(e)=>setPL(e.target.value)} />
        </div>
        <div>
          <button type="button" onClick={()=>loginSubmit()}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
