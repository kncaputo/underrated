import React from 'react';
import StarRating from './StarRating';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { currentUser } from '../testData';

describe('StarRating', () => {
  it('should render correctly when there\'s a user with a star rating', () => {
    render(
      <StarRating
        currentUser={currentUser}
        currentUserRating={5}
        canEdit={!currentUser ? false : true} 
        setStarRating={jest.fn()}
      />
    )

    expect(screen.getByText('Your rating is 5')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  })

  it('should render correctly when there\'s a user without a star rating', () => {
    render(
      <StarRating
        currentUser={currentUser}
        currentUserRating={0}
        canEdit={!currentUser ? false : true} 
        setStarRating={jest.fn()}
      />
    )

    expect(screen.getByText('Rate this movie')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  })

  it('should render correctly when there\'s no user', () => {
    let currentUser1 = null;

    render(
      <StarRating
        currentUser={currentUser1}
        currentUserRating={0}
        canEdit={!currentUser1 ? false : true} 
        setStarRating={jest.fn()}
      />
    )

    expect(screen.getByText('Please log in to rate')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  })
})


// test that the react stars and rating text render
// test that the handleStarChange is fired/called with the newRating
// test that handleRatingText changes if a user is logged in (?)
// test that handleRatingText changes is a user is logged in and not yet rated a movie (?)


