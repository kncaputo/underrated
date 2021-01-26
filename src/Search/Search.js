import React from 'react';
import './Search.scss';

const Search = (props) => {

  searchByInput = (event) => {
    event.preventDefault()
    props.getUserInput(event.target.value)
  }

  return(
    <input 
      onChange={searchByInput} 
      type="text" 
      value={props.input} 
      placeholder="&#128269; search by movie title" 
      className="search-bar">
    </input>
  )
}

export default Search;