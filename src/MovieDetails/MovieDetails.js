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

  formatGenres = () => {
    if (!this.state.singleMovie.genres) {
      return <p className="unavailable-genres">Unavailable</p>
    } else if (this.state.singleMovie.genres.length > 1) {
      let commaList = this.state.singleMovie.genres.map(genre => {
        return(
          <p className="genre">{genre}</p>
        )
      })
      return commaList;
    } else {
      return <p className="genre">{this.state.singleMovie.genres[0]}</p>;
    }
  }

  render() {
    return(
      <section className="movie-details">
        <section className="banner-container">
          <img src={this.state.singleMovie.backdrop_path} className="banner-img"/>
        </section>
        <section className="movie-info">
          <section className="movie-aside">
            <img src={this.state.singleMovie.poster_path} className="poster-img" />
          </section>
          <section className="movie-main">
            <section className="backdrop-overlay"> 
              <h1 className="title">{this.state.singleMovie.title}</h1>
              <p className="tagline">{this.state.singleMovie.tagline}</p>
              <p className="rating">Average Rating: {this.state.singleMovie.average_rating}</p>
              <section className="genre-list">
                {this.formatGenres()}
              </section>
            </section>
            <section className='overview-box'>
              <h3>Synopsis</h3>
              <p className="overview">{this.state.singleMovie.overview}</p>
            </section>
          </section>
        </section>
        <MovieTrailers 
          id={this.props.id} 
        />
      </section>
    )
  }
}

export default MovieDetails;