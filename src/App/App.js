import React, { Component } from 'react';
import Login from '../Login/Login';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieDetails from '../MovieDetails/MovieDetails';
import { fetchMovies } from '../apiCalls';
import { Route } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      currentUser: '',
      currentUserRatings: []
    }
  }
  
  componentDidMount = () => {
    fetchMovies()
      .then(allMovies => this.setState({ movies: allMovies.movies}))
      .catch(error => this.setState({ error: error.message }))
  }

  render() {
    return(
      <main>
        <header>
          <h1 className='page-title'>underrated</h1>
          <nav>
            <p className='nav-labels'>all movies</p>
            <p className='nav-labels'>watchlist</p>
            {/* <p className='nav-labels'>account</p> */}
            <DropdownButton className='nav-labels' title='account'>
              <Login />
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
            return (<MovieDetails id={match.params.id} />)
          }}
        />
      </main>
    ) 
  }
}

export default App;
