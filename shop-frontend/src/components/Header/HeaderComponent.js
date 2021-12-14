import React, { useState,useEffect } from "react";
import "./HeaderComponent.scss";
import { FaBeer, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderComponent = ({ isLogin, logout, history, uName, cartItems }) => {

 
  return (
    <div className="header">
      {/* {console.log("check uname props:",uName)} */}
      <div className="grid">
        <div className="header-container">
          <h3>Trang chủ</h3>
          <div className="header-search">
            <input type="text" placeholder="Tìm kiếm sản phẩm" />
            <button type="button-search">
              <FaSearch />
            </button>
          </div>
          {isLogin && (
            <div className="cart">
              <div className="icon-cart">
                <FaShoppingCart />
              </div>
             
              {cartItems && cartItems.length > 0 &&
                <span className="amount-cart">
                  <span>{cartItems.length}</span>
                </span>
              }
            </div>
          )}
          {!isLogin && (
            <div className="header-user">
              <div className="r-l">
                <Link to={"/register"}>
                  {" "}
                  <span>Đăng kí</span>
                </Link>
                <span className="rg">|</span>
                <Link to={"/login"}>
                  {" "}
                  <span>Đăng nhập</span>
                </Link>
              </div>
            </div>
          )}
          {isLogin && (
            <div className="header-logined">
              <div className="r-l">
                <span>Chào {uName} </span>

                <span className="rg">|</span>
                <span
                  onClick={() => {
                    window.location.reload();
                    logout();
                    history.push("/");
                  }}
                >
                  Đăng xuất
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
