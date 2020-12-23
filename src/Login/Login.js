import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return(
      <section>
        <Dropdown.Item eventKey="1">
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
          />
        </Dropdown.Item>
        <Dropdown.Item eventKey="2">
        <input
            type="text"
            placeholder="Password"
            value={this.state.password}
          />
        </Dropdown.Item>
      </section>
    )
  }
}

export default Login;


//form that accepts the sign in
//if sign in is successful, make the request
//if sign in is unsucessful, post message, prompt to make an account