import React, { Component } from 'react';
import Login from '../Login/Login';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieDetails from '../MovieDetails/MovieDetails';
import Search from '../Search/Search';
import Banner from '../Banner/Banner';
import { fetchMovies, fetchSingleMovie, postLoginCredentials } from '../apiCalls';
import { Route, NavLink } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      currentUser: null,
      input: '',
      dropdownValue: 'all',
      ratingValue: 'any'
    }
  }
  
  componentDidMount = () => {
    fetchMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies}))
    .then(() => this.findMovieGenres())
    .catch(error => this.setState({ error: error.message }))
  }

  findMovieGenres = () => {
    this.state.movies.map(movie => {
      fetchSingleMovie(movie.id)
      .then(singleMovie => movie.genres = singleMovie.movie.genres)
    })
  }

  validateLogin = (loginEmail, loginPassword) => {
    const credentials = {
      email: loginEmail,
      password: loginPassword
    }

    postLoginCredentials(credentials)
    .then(user => this.setState({ currentUser: user.user }))
    .catch(error => this.setState({ error: error.message}))
  }

  clearError = () => {
    this.setState({ error: '' })
  }

  signOut = () => {
    this.setState({ currentUser: null })
  }

  get filterMoviesByTitle() {
    if (this.state.dropdownValue !== 'all') {
      return this.state.movies.filter(movie => {
        if (movie.genres) {
          return movie.genres.includes(this.state.dropdownValue);
        }
      })
    } else if (this.state.ratingValue !== 'any') {
      return this.state.movies.filter(movie => {
        const roundedRating = parseInt(movie.average_rating)
        console.log(roundedRating)
        return roundedRating === parseInt(this.state.ratingValue)
      })
    } else {
      return this.state.movies.filter(movie => {
        return movie.title.toLowerCase().includes(this.state.input)
      })
    }
  }

  getUserInput = (inputValue) => {
    this.setState({input: inputValue})
  }

  handleDropdownValue = (event) => {
    this.setState({ dropdownValue: event.target.name})
  }

  handleRatingValue = (event) => {
    this.setState({ ratingValue: event.target.value })
  }

  render() {
    return(
      <main>
        <header>
          <h1 className='page-title'>underrated</h1>
          <nav>
            <NavLink exact to="/" className='nav-labels'>
              all movies
            </NavLink>
            <p className='nav-labels'>watchlist</p>
            <DropdownButton 
              className='nav-labels' 
              title='account'>
                {!this.state.currentUser &&
                  <Login 
                    validateLogin={this.validateLogin} 
                    error={this.state.error} 
                    clearError={this.clearError}
                  />
                }
                {this.state.currentUser &&
                  <section>
                    <p>Hello, {this.state.currentUser.name}!</p>
                    <button onClick={this.signOut}>Sign Out</button>
                  </section>     
                }
            </DropdownButton>
          </nav>
        </header>
        <Route 
          exact 
          path="/" 
          render={() => {
            return (
              <section>
                <Banner />
                <Search 
                  getUserInput={this.getUserInput} 
                />
                <section className="genre-filter">
                  <p className="dropdown-text">showing <span className="active-text">{this.state.dropdownValue}</span> movies</p>
                  <DropdownButton
                    title=''
                    className='genre-dropdown'>
                    <button onClick={() => this.setState({ dropdownValue: 'all' })}>all</button>
                    <button name="Action" onClick={(event) => this.handleDropdownValue(event)}>action</button>
                    <button name="Adventure" onClick={(event) => this.handleDropdownValue(event)}>adventure</button>
                    <button name="Animation" onClick={(event) => this.handleDropdownValue(event)}>animation</button>
                    <button name="Comedy" onClick={(event) => this.handleDropdownValue(event)}>comedy</button>
                    <button name="Crime" onClick={(event) => this.handleDropdownValue(event)}>crime</button>
                    <button name="Drama" onClick={(event) => this.handleDropdownValue(event)}>drama</button>
                    <button name="Family" onClick={(event) => this.handleDropdownValue(event)}>family</button>
                    <button name="Fantasy" onClick={(event) => this.handleDropdownValue(event)}>fantasy</button>
                    <button name="History" onClick={(event) => this.handleDropdownValue(event)}>history</button>
                    <button name="Horror" onClick={(event) => this.handleDropdownValue(event)}>horror</button>
                    <button name="Music" onClick={(event) => this.handleDropdownValue(event)}>music</button>
                    <button name="Romance" onClick={(event) => this.handleDropdownValue(event)}>romance</button>
                    <button name="Science fiction" onClick={(event) => this.handleDropdownValue(event)}>science fiction</button>
                    <button name="Thriller" onClick={(event) => this.handleDropdownValue(event)}>thriller</button>
                    <button name="War" onClick={(event) => this.handleDropdownValue(event)}>war</button>
                    <button name="Western" onClick={(event) => this.handleDropdownValue(event)}>western</button>
                  </DropdownButton>
                  <p className="dropdown-text">with <span className="active-text">{this.state.ratingValue}</span> rating</p>
                  <DropdownButton
                    title=''
                    className='rating-dropdown'>
                    <button onClick={() => this.setState({ ratingValue: 'any' })}>any</button>
                    <button name="one" value="1" onClick={(event) => this.handleRatingValue(event)}>one</button>
                    <button name="two" value="2" onClick={(event) => this.handleRatingValue(event)}>two</button>
                    <button name="three" value="3" onClick={(event) => this.handleRatingValue(event)}>three</button>
                    <button name="four" value="4" onClick={(event) => this.handleRatingValue(event)}>four</button>
                    <button name="five" value="5" onClick={(event) => this.handleRatingValue(event)}>five</button>
                    <button name="six" value="6" onClick={(event) => this.handleRatingValue(event)}>six</button>
                    <button name="seven" value="7" onClick={(event) => this.handleRatingValue(event)}>seven</button>
                    <button name="eight" value="8" onClick={(event) => this.handleRatingValue(event)}>eight</button>
                    <button name="nine" value="9" onClick={(event) => this.handleRatingValue(event)}>nine</button>
                    <button name="ten" value="10" onClick={(event) => this.handleRatingValue(event)}>ten</button>
                  </DropdownButton>
                </section>
                <MovieGrid
                  movies={this.filterMoviesByTitle}  
                />
              </section>
            )
          }}
        />
        <Route 
          exact
          path="/movie/:id"
          render={( { match }) => {
            return (
              <MovieDetails 
                id={match.params.id}
                currentUser={this.state.currentUser}
             />)
          }}
        />
      </main>
    ) 
  }
}

export default App;


// iterate over all movies
  // for each movie, use movie id 
    // fetch single movie
      // if single movie genre === searched genre
        // return single movie