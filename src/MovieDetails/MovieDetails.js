import React, { Component } from 'react';
import { fetchSingleMovie } from '../apiCalls'; 
import ListItem from '../ListItem/ListItem';
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

  generateListItem() {
    return (
      <section>
        <ListItem 
          label='Release Date'
          body={new Date(this.state.singleMovie.release_date).toLocaleDateString()}
        />
        <ListItem 
          label='Runtime'
          body={`${this.state.singleMovie.runtime} mins`}
        />
        <ListItem 
          label='Budget'
          body={`$${new Intl.NumberFormat('en-US').format(this.state.singleMovie.budget)}`}
        />
        <ListItem 
          label='Revenue'
          body={`$${new Intl.NumberFormat('en-US').format(this.state.singleMovie.revenue)}`}
        />
      </section>
    )
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
            {this.generateListItem()}
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
              <section className='main-list'>
                {this.generateListItem()}
              </section>
            </section>
            <section className='trailer-box'>
              <h3 className='trailer-header'>Trailers</h3>
              <MovieTrailers 
                id={this.props.id} 
              />
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default MovieDetails;