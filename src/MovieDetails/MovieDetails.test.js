import React from 'react';
import MovieDetails from './MovieDetails';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { user } from '../testData';
// jest.mock('../apiCalls');

// test that the moviedetails render
  // mock fetchSingleMovie (async)
  // mock fetchUserRatings (async)
  // mock postUserRating (async)
  // mock deleteUserRating (async)
  // mock fetchMovieTrailers (?) 

// integration test --> on log in, ratings can be accessed/updated
// when not logged in, no rating can be added 
// when not logged in, 'please log in to rate'

describe('MovieDetails', () => {
  beforeEach(() => {
    
  })

  it('should render correctly', () => {
    render(
      <MovieDetails 
        id={1}
        currentUser={user.user}
      />
    )
  
  })

})