import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }
  }
  searchByInput = (event) => {
    event.preventDefault()
    this.setState({input: event.target.value.toLowerCase()})
    this.props.getUserInput(event.target.value)
  }

  render() {
    return(
      <input onChange={this.searchByInput} type="text" value={this.state.input} placeholder="&#128269; search by movie title" className="search-bar"></input>
    )
  }
}

export default Search;