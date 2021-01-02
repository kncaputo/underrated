import React, { Component } from 'react';
import Login from '../Login/Login';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieDetails from '../MovieDetails/MovieDetails';
import { fetchMovies, fetchUserRatings, postLoginCredentials } from '../apiCalls';
import { Route, NavLink } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      currentUser: null
    }
  }
  
  componentDidMount = () => {
    fetchMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies}))
    .catch(error => this.setState({ error: error.message }))
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
              <MovieGrid
                movies={this.state.movies}  
              />
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
