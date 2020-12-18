import React, { Component } from 'react';
import { fetchSingleMovie } from '../apiCalls'; 
import './MovieDetails.css';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      singleMovie: {},
      movieTrailers: [],
      error: ''
    }
  }
  
  componentDidMount() {
    fetchSingleMovie(this.props.id)
    .then(singleMovie => this.setState({ singleMovie: singleMovie.movie }))
    .catch(error => this.setState({ error: error.message}))
  }

  render() {
    return(
      <section className="movie-details">
        <h1>DEETZ</h1>
      </section>
    )
  }
}

export default MovieDetails;