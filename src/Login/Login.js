import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    }
  }

  render() {
    return(
      <h1>HELLO THERE</h1>
    )
  }
}

export default Login;


//form that accepts the sign in
//if sign in is successful, make the request
//if sign in is unsucessful, post message, prompt to make an account