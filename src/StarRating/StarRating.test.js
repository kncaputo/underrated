import React from 'react';
import StarRating from './StarRating';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { currentUser } from '../testData';
// import { mockComponent } from 'react-dom/test-utils';

describe('StarRating', () => {
  it('should render correctly', () => {
    render(
      <StarRating
        currentUser={currentUser}
        currentUserRating={5}
        canEdit={!currentUser ? false : true} 
        setStarRating={jest.fn()}
      />
    )
  })
})


// test that the react stars and rating text render
// test that the handleStarChange is fired/called with the newRating
// test that handleRatingText changes if a user is logged in (?)
// test that handleRatingText changes is a user is logged in and not yet rated a movie (?)


