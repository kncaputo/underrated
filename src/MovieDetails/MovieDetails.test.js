import React from 'react';
import MovieDetails from './MovieDetails';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { user } from '../testData';
import { fetchSingleMovie, fetchMovieTrailers } from '../apiCalls';
import { singleMovie, trailers } from '../testData';
jest.mock('../apiCalls');

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
    window.scrollTo = jest.fn()

    fetchSingleMovie.mockResolvedValueOnce(singleMovie)
    fetchMovieTrailers.mockResolvedValueOnce(trailers)

    render(
      <MovieDetails 
        id={1}
        currentUser={user.user}
      />
    )
  })

  it('should render correctly', () => {
    const title = screen.getByText('Rogue')
    const genre = screen.getAllByText('Action')
    const runtime = screen.getAllByText('106 mins')
    const tagline = screen.getByText('When the hunter becomes the prey.')
    const averageRating = screen.getByText('☆ 6.4')

    expect(window.scrollTo).toBeCalledWith(0, 0)
    expect(title).toBeInTheDocument()
    expect(genre).toHaveLength(2)
    expect(runtime).toHaveLength(2)
    expect(tagline).toBeInTheDocument()
    expect(averageRating).toBeInTheDocument()
  })
})