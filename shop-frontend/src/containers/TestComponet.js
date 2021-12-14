import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderComponent from '../components/Header/HeaderComponent';

export class TestComponet extends Component {
  render() {
    console.log("check props", this.props);
    return (
      <HeaderComponent
      
        
      />
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.userReducers.login.isLogin,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponet)

