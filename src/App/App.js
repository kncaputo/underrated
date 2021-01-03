import React, { Component } from 'react';
import Login from '../Login/Login';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieDetails from '../MovieDetails/MovieDetails';
import Search from '../Search/Search';
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
      dropdownValue: 'all'
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
      .then(singleMovie =>  movie.genres = singleMovie.movie.genres)
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
                <Search 
                  getUserInput={this.getUserInput} 
                />
                <section className="genre-filter">
                  <p>showing {this.state.dropdownValue} movies</p>
                  <DropdownButton
                    title=''>
                    <button name="Action" onClick={(event) => this.handleDropdownValue(event)}>Action</button>
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