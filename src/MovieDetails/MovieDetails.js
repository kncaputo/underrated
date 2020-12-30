import React, { Component } from "react";
import { fetchSingleMovie, fetchUserRatings, postUserRating, deleteUserRating } from "../apiCalls"; 
import ListItem from "../ListItem/ListItem";
import MovieTrailers from "../MovieTrailers/MovieTrailers";
import StarRating from "../StarRating/StarRating";
import "./MovieDetails.css";

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      singleMovie: {},
      error: "",
      currentUserRating: null,
      onWatchlist: false
    }
  }
  
  componentDidMount() {
    fetchSingleMovie(this.props.id)
    .then(singleMovie => this.setState({ singleMovie: singleMovie.movie }))
    .then(() => this.getUserRatings())
    .catch(error => this.setState({ error: error.message}))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentUser !== this.props.currentUser) {
      this.setState({ currentUserRating: null, error: "" })
      this.getUserRatings()
    }
  }

  getUserRatings() {
    if (this.props.currentUser) {
      this.setState({ formattedRating: this.state.singleMovie.average_rating.toFixed(1)})
      this.updateUserRating()
    }
  }

  updateUserRating = () => {
    fetchUserRatings(this.props.currentUser.id)
    .then(ratings => { 
      console.log('allratings', ratings)
      const userRating = ratings.ratings.find(rating => {
        return rating.movie_id === this.state.singleMovie.id
      })
      console.log('userRating', userRating)
      this.setState({ currentUserRating: userRating })
    })
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
          label="Release Date"
          body={new Date(this.state.singleMovie.release_date).toLocaleDateString()}
        />
        <ListItem 
          label="Runtime"
          body={`${this.state.singleMovie.runtime} mins`}
        />
        <ListItem 
          label="Budget"
          body={`$${new Intl.NumberFormat("en-US").format(this.state.singleMovie.budget)}`}
        />
        <ListItem 
          label="Revenue"
          body={`$${new Intl.NumberFormat("en-US").format(this.state.singleMovie.revenue)}`}
        />
      </section>
    )
  }

  toggleWatchlist = () => {
    if (this.state.onWatchlist === false) {
      this.setState({ onWatchlist: true })
    } else {
      this.setState({ onWatchlist: false})
    }
  }

  setStarRating = (rating) => {
    let ratingId;
    let userId;
    
    if (this.props.currentUser && this.state.currentUserRating) {
      ratingId = this.state.currentUserRating.id
      userId = this.props.currentUser.id

      deleteUserRating(userId, ratingId)
      .then(response => console.log('delete response', response))
      .catch(error => this.setState({ error: error.message }))

      this.createNewRating(userId, rating)

    } else if (this.props.currentUser) {
      userId = this.props.currentUser.id

      this.createNewRating(userId, rating)
    }
  }

  createNewRating = (userId, rating) => {
    const newRating = {
      movie_id: this.state.singleMovie.id,
      rating: +rating
    }
    
    console.log('newRating obj', newRating)
    
    postUserRating(userId, newRating)
    .then(() => this.updateUserRating())
    .catch(error => this.setState({ error: error.message }))
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
              <section className="responsive-poster">
                <img src={this.state.singleMovie.poster_path} className="poster-img" />
              </section>
              <section className="main-header-details">
                <h1 className="title">{this.state.singleMovie.title}</h1>
                <p className="tagline">{this.state.singleMovie.tagline}</p>
                <p className="rating">
                  <span className="rating-star">☆ {this.state.formattedRating}</span>/10
                </p>
                <section className="genre-list">
                  {this.formatGenres()}
                </section>
              </section>  
            </section>
            <section className="overview-box">
              <section className="rating-watchlist">
                {!this.state.currentUserRating &&
                  <StarRating 
                    currentUserRating={0}
                    canEdit={true} 
                    setStarRating={this.setStarRating}
                  />
                }
                {this.state.currentUserRating && 
                  <StarRating 
                    currentUserRating={this.state.currentUserRating.rating}
                    canEdit={true} 
                    setStarRating={this.setStarRating}
                  />
                }
                {this.state.onWatchlist === true && <button className="on-watchlist-button" onClick={() => this.toggleWatchlist()}>On Watchlist</button>}
                {this.state.onWatchlist === false && <button className="add-watchlist-button" onClick={() => this.toggleWatchlist()}>+ Add to Watchlist</button>}
              </section>
              <h3>Synopsis</h3>
              <p className="overview">{this.state.singleMovie.overview}</p>
              <section className="responsive-list">
                {this.generateListItem()}
              </section>
            </section>
            <section className="trailer-box">
              <h3 className="trailer-header">Trailers</h3>
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