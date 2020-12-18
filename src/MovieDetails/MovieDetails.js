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
        <section className="banner-container">
          <img src={this.state.singleMovie.backdrop_path} className="banner-img"/>
        </section>
        <img src={this.state.singleMovie.poster_path} className="poster-img" />
        <MovieTrailers id={this.props.id} />
      </section>
    )
  }
}

export default MovieDetails;