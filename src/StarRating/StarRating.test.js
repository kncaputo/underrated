import React from 'react';
import StarRating from './StarRating';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { currentUser, user } from '../testData';

describe('StarRating', () => {
  it('should render correctly when there\'s a user with a star rating', () => {
    render(
      <StarRating
        currentUser={user.user}
        currentUserRating={5}
        canEdit={!user.user ? false : true} 
        setStarRating={jest.fn()}
      />
    )

    expect(screen.getByText('Your rating is 5')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  })

  it('should render correctly when there\'s a user without a star rating', () => {
    render(
      <StarRating
        currentUser={user.user}
        currentUserRating={0}
        canEdit={!user.user ? false : true} 
        setStarRating={jest.fn()}
      />
    )

    expect(screen.getByText('Rate this movie')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  })

  it('should render correctly when there\'s no user', () => {
    let user1 = null;

    render(
      <StarRating
        currentUser={user1}
        currentUserRating={0}
        canEdit={!user1 ? false : true} 
        setStarRating={jest.fn()}
      />
    )

    expect(screen.getByText('Please log in to rate')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  })

  it('should call handleStarChange with a new rating when a star is clicked', () => {
    
  })
})