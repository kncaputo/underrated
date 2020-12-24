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

  handleClick(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return(
      <section>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={this.state.email}
          onClick={(event) => this.handleClick(event)}
          onChange={(event) => this.handleChange(event)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onClick={(event) => this.handleClick(event)}
          onChange={(event) => this.handleChange(event)}
        />
        <button className="submit-button">SUBMIT</button>
      </section>
    )
  }
}

export default Login;


//form that accepts the sign in
//if sign in is successful, make the request
//if sign in is unsucessful, post message, prompt to make an account