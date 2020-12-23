import React, { Component } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieDetails from '../MovieDetails/MovieDetails';
import Login from '../Login/Login';
import { fetchMovies } from '../apiCalls';
import { Route } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
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
              <Dropdown.Item eventKey="1">Hello</Dropdown.Item>
              <Dropdown.Item eventKey="2">Goodbye</Dropdown.Item>
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
