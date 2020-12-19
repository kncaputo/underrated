import React, { Component } from 'react';
import { fetchMovieTrailers } from '../apiCalls';
import './MovieTrailers.css';

class MovieTrailers extends Component {
  constructor() {
    super();
    this.state = {
      trailers: [],
      error: ''
    }
  } 

  componentDidMount() {
    fetchMovieTrailers(this.props.id)
    .then(movieTrailers => this.setState({ trailers: movieTrailers.videos }))
    .catch(error => this.setState({ error: error.message }))
  }

  render() {
    return(
      <section className="trailers">
        <h1>TRAILERS!</h1>
      </section>
    )
  }
}

export default MovieTrailers;