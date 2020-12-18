import React, { Component } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../apiCalls'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: ''
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
            <p className='nav-labels'>account</p>
          </nav>
        </header>
        {/* <MovieGrid
          movies={this.state.movies}
        /> */}
      </main>
    ) 
  }
}

export default App;
