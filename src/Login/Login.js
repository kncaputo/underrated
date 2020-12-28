import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleClick(event) {
    event.preventDefault()
  }

  handleChange(event) {
    this.props.clearError()
    this.setState({ [event.target.name]: event.target.value })
  }

  determineError = () => {
    if (this.props.error) {
      return (
        <section>
          <p>{this.props.error}</p>
        </section>
      )
    }
  }

  submitLogin = () => {
    this.props.validateLogin(this.state.email, this.state.password);
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({ email: '', password: '' })
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
        {this.determineError()}
        <button 
          className="submit-button" 
          onClick={this.submitLogin}>
          SUBMIT
        </button>
      </section>
    )
  }
}

export default Login;