import React, { useState } from "react";
import "./HomeContent.scss";
import FormatCurrency from "../../utils/FormatCurrency";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { Link } from "react-router-dom";

const HomeContent = ({
  listProduct,
  addToCart,
  cartItems,
  deleteCart,
  payment,
}) => {
  const [product, setProduct] = useState();
  const [openOrder, setOpenOrder] = useState(false);
  const [openSuccessOrder, setSuccessOrder] = useState(false);

  const [checkValid, setCheckValid] = useState(false);
  const [notiOrderSuccess,setNotiOrderSuccess] = useState("")
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");

  const [infor, setInfor] = useState({ name: "", phone: "", address: "" });
  const [total, setTotal] = useState(0);

  const openModal = (product) => {
    setProduct(product);
  };
  const closeModal = () => {
    setProduct();
  };

  const handleSetCheckValid = () => {
    if (!infor.name || !infor.phone || !infor.address) {
      setCheckValid(false)
      setNotiOrderSuccess("Vui lòng nhập thông tin hợp lệ")
    } else {
      setSuccessOrder(true)
      setNotiOrderSuccess("")
    }
    return setCheckValid(true);
  }

  const handleOpenOrder = () => {
    setOpenOrder(true);
  };

  const handleInputOrder = (e) => {};

  return (
    <div className="home-container">
          {openSuccessOrder && setCheckValid && (
                  <div className="modal-success">
        <p><b>Chúc mừng bạn đã đặt hàng thành công</b></p>
        <p><b>Tên:</b> {infor.name}</p>
        <p><b>Số điện thoại:</b> {infor.phone}</p>
        <p><b>Địa chỉ:</b> {infor.address}</p>
        <p><b>Danh sách đơn hàng bao gồm: </b></p>
        {cartItems.map(item => (
          <p> <b>{ item.count}</b> x <b>{item.title}</b></p>
        ))}
          <p><b>Tổng số tiền: </b> {FormatCurrency(total)}</p>

          <button type="button" onClick={() => {
            window.location.reload()
        }}>Tiếp tục mua hàng</button>

                 </div>
                )}
      <div className="grid">
  
        <div className="home-content">
          <div className="grid-row">
            <div className="grid-column-7-12">
              <div className="product-container">
                <h3>Danh sách sản phẩm</h3>
                <div className="product-list">
                  <div className="grid-row">
                    {listProduct &&
                      listProduct.length > 0 &&
                      listProduct.map((item) => (
                        <div className="grid-column-4-7">
                          <div className="product-item" key={item.id}>
                            <div className="product-item-content">
                              <img src={item.image} alt="" />
                              <div className="product-main">
                                <Link
                                  to=""
                                  className="title-product"
                                  onClick={() => openModal(item)}
                                >
                                  {item.title}
                                </Link>
                                <div className="price-payment">
                                  <div className="price-prd">
                                    <span>
                                      <b>{FormatCurrency(item.price)}</b>
                                    </span>
                                  </div>
                                  <button
                                    className="payment-product"
                                    onClick={() => {
                                      item.count = 1;
                                      addToCart(item);

                                      <Link to="/"></Link>;
                                      window.location.reload();
                                    }}
                                  >
                                    Đặt hàng
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {product && (
              <Modal isOpen={true} onRequestClose={closeModal}>
                <Zoom>
                  <button className="modal-close" onClick={closeModal}>
                    X
                  </button>

                  <div className="product-details-container">
                    <div className="product-detail-main">
                      <div className="product-detail-img">
                        <img src={product.image} alt="" />
                      </div>
                      <div className="product-detail-descriptions">
                        <p>
                          <strong>{product.title}</strong>
                        </p>
                        <p>{product.description}</p>

                        <p>
                          Chọn size:{""}
                          {product.availablesSizes &&
                            product.availablesSizes.map((item) => (
                              <button className="btn-size" key={item.id}>
                                {item}
                              </button>
                            ))}
                        </p>
                        <div className="product-price-p">
                          <p>
                            <strong>{FormatCurrency(product.price)}</strong>
                          </p>
                        </div>

                        <button
                          className="payment-modal-product"
                          onClick={() => {
                            product.count = 1;
                            addToCart(product);

                            window.location.reload();
                          }}
                        >
                          Đặt hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </Zoom>
              </Modal>
            )}

            <div className="grid-column-3-12">
              <div className="cart-container">
                <h3>
                  Bạn đã đặt {cartItems.length} sản phẩm
                  {/* {console.log("check pops cart",cartItems)} */}
                </h3>
                <ul className="itemcart-list">
                  {cartItems &&
                    cartItems.length > 0 &&
                    cartItems.map((item) => (
                      <li className="itemcart-item" key={item.id}>
                        <div className="itemcart-img">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="itemcart-main">
                          <div className="itemcart-title">
                            <span>{item.title}</span>
                          </div>
                          <div className="itemcart-pricea-remove">
                            <div className="itemcart-price-amount">
                              <span>
                                {FormatCurrency(item.price)} x {item.count}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="itemcart-remove"
                              onClick={() => {
                                deleteCart(item._id);
                              }}
                            >
                              <span>Huỷ bỏ</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                {cartItems.length > 0 && (
                  <div className="price-total-pay">
                    <div className="price-total">
                      <span>
                        <b> Tổng tiền:</b>{" "}
                        <span className="price">
                          {" "}
                          {FormatCurrency(
                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                          )}
                        </span>
                      </span>
                    </div>
                    <button
                      className="price-payment"
                      onClick={() => {
                        handleOpenOrder();
                        setTotal(
                          cartItems.reduce((a, c) => a + c.price * c.count, 0)
                        );
                      }}
                    >
                      Mua hàng
                    </button>
                  </div>
                )}

                {openOrder && (
                  <div className="cart-order">
                    <span>
                      <b>Vui lòng điền thông tin thanh toán</b>
                    </span>
                    <div className="order-form">
                      <div className="form-group">
                        <label htmlFor="Name">Tên</label>
                        <input
                          type="text"
                          className="form-control"
                          value={infor.name}
                          onChange={(e) =>
                            setInfor({ ...infor, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Phone">Số điện thoại</label>
                        <input
                          type="text"
                          value={infor.phone}
                          className="form-control"
                          onChange={(e) =>
                            setInfor({ ...infor, phone: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={infor.sucess}
                          onChange={(e) =>
                            setInfor({ ...infor, address: e.target.value })
                          }
                        />
                      </div>
                      {
                        (console.log("check state", infor),
                        console.log("check total", total))
                      }

                      <button
                        className="btn-checkout"
                        onClick={() => {
                          // setSuccessOrder(true);
                          handleSetCheckValid()
                          payment(
                            infor.name,
                            infor.address,
                            infor.phone,
                            total
                          );
                        }}
                      >
                        Thanh toán
                      </button>

                      {notiOrderSuccess}
                    </div>
                  </div>
                )}

               
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default HomeContent;
