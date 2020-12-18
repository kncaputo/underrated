import React, { Component } from 'react';
import { fetchSingleMovie } from '../apiCalls'; 
import MovieTrailers from '../MovieTrailers/MovieTrailers';
import './MovieDetails.css';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      singleMovie: {},
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
        <MovieTrailers id={this.props.id} />
      </section>
    )
  }
}

export default MovieDetails;