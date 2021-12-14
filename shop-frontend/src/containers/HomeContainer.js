import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginComponent from "../components/Login/LoginComponent";
import * as userActions from "../store/actions/userActions";
import * as productActions from "../store/actions/productActions";
import * as cartActions from "../store/actions/cartActions";

import HeaderComponent from "../components/Header/HeaderComponent";
import HomeContent from "../components/Home/HomeContent";

import axios from "axios";

export class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      listProduct: [],
      cartItems: []
    };
  }

  async componentDidMount() {
    this.props.usrActions.auth();
    this.props.prdActions.getAllProduct();
    this.props.crtActions.getCart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.setState({
      cartItems: this.props.cartItems
    })
  }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.cartItems !== prevProps.cartItems) {
  //     this.setState({
  //       cartItems:this.props.cartItems
  //     })
  //   }
  // }

  render() {
    console.log("check props home: ", this.props);
    console.log("check state cart: ",this.state.cartItems)

    return (
      <>
        <HeaderComponent
          isLogin={this.props.isLogin}
          logout={() => this.props.usrActions.logout()}
          history={this.props.history}
          uName={this.props.uName}
          cartItems={this.state.cartItems}
       
        />

        <HomeContent
          listProduct={this.props.dataProductRedux}
          addToCart={(product)=>this.props.crtActions.addToCart(product)}
        
          cartItems={this.state.cartItems}
          deleteCart={(id_product)=>this.props.crtActions.deleteProductInCart(id_product)} 

          payment={( address, phone, name,total) => 
          this.props.crtActions.payment( address, phone, name,total)}

          // openModal={this.openModal}
          // closeModal={this.closeModal}
          // product={this.state.product}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.userReducers.login.isLogin,
  uName: state.userReducers.login.userN,
  dataProductRedux: state.productReducers.product.listProduct.data,
  cartItems: state.cartReducers.cart.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    usrActions: bindActionCreators(userActions, dispatch),
    prdActions: bindActionCreators(productActions, dispatch),
    crtActions: bindActionCreators(cartActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
