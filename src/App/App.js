import React, { Component } from 'react';
import Header from '../Header/Header';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieDetails from '../MovieDetails/MovieDetails';
import Search from '../Search/Search';
import Banner from '../Banner/Banner';
import Watchlist from '../Watchlist/Watchlist';
import { fetchMovies, fetchSingleMovie, postLoginCredentials } from '../apiCalls/apiCalls';
import { Route } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './App.scss';

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

  get filterMoviesBySelection() {
    const filterByGenre = this.state.movies.filter(movie => {
      if (this.state.dropdownValue !== 'all' && movie.genres) {
        return movie.genres.includes(this.state.dropdownValue)
      } else {
        return this.state.movies
      }
    })

    const filterByRating = filterByGenre.filter(movie => {
      if (this.state.ratingValue !== 'any') {
        const roundedRating = parseInt(movie.average_rating)
        return roundedRating === parseInt(this.state.ratingValue)
      } else {
        return filterByGenre
      }
    })

    return filterByRating.filter(movie => {
      return movie.title.toLowerCase().includes(this.state.input)
    })
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

  clearFilters = () => {
    this.setState({ input: '', dropdownValue: 'all', ratingValue: 'any' })
  }

  generateGenreButtons = () => {
    const genres = ['Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Romance', 'Science', 'Thriller', 'War', 'Western'];
    
    return genres.map(genre => {
      return <button name={genre} className='dropdown-filter' onClick={(event) => this.handleDropdownValue(event)}>{genre.toLowerCase()}</button>
    })
  }

  generateRatingsButtons = () => {
    const ratings = [{name: 'one', value: 1}, {name: 'two', value: 2}, {name: 'three', value: 3}, {name: 'four', value: 4}, {name: 'five', value: 5}, 
    {name: 'six', value: 6}, {name: 'seven', value: 7}, {name: 'eight', value: 8}, {name: 'nine', value: 9}, {name: 'ten', value: 10}];
    
    return ratings.map(rating => {
      return  <button name={rating.name} value={rating.value} className='dropdown-filter' onClick={(event) => this.handleRatingValue(event)}>{rating.name}</button>
    })
  }

  generateFilterDropdown = () => {
    return(
      <section className='genre-filter'>
        <section className='filter-title-box'>
          <DropdownButton
            title={`showing ${this.state.dropdownValue.toUpperCase()} movies`}
            className='genre-dropdown'
            id='filter-title-l'>
            <button className='dropdown-filter' onClick={() => this.setState({ dropdownValue: 'all' })}>all</button>
            {this.generateGenreButtons()}
          </DropdownButton>
        </section>
        <section className='filter-title-box'>
          <DropdownButton
            title={`with ${this.state.ratingValue.toUpperCase()} rating`}
            className='rating-dropdown'
            id='filter-title-r'>
            {this.generateRatingsButtons()}
          </DropdownButton>
        </section>
        {(this.state.input !== '' || this.state.dropdownValue !== 'all' || this.state.ratingValue !== 'any') &&
          <button className='clear' onClick={() => this.clearFilters()}>clear</button>
        }
      </section>
    )
  }

  render() {
    return(
      <main>
        <Header 
          currentUser={this.state.currentUser}
          validateLogin={this.validateLogin}
          error={this.state.error}
          clearError={this.clearError}
          signOut={this.signOut}
        />
        <Route 
          exact 
          path='/' 
          render={() => {
            return (
              <section>
                <Banner />
                <Search 
                  getUserInput={this.getUserInput} 
                  input={this.state.input}
                />
                {this.generateFilterDropdown()}
                <MovieGrid
                  movies={this.filterMoviesBySelection}  
                />
              </section>
            )
          }}
        />
        <Route 
          exact
          path='/movie/:id'
          render={( { match }) => {
            return (
              <MovieDetails 
                id={match.params.id}
                currentUser={this.state.currentUser}
             />)
          }}
        />
        <Route
          exact
          path='/watchlist'
          component={Watchlist}
        />  
      </main>
    ) 
  }
}

export default App;