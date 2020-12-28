import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends Component { 
  constructor() {
    super();
    this.state = {
      rating: 0
    }
  }

  onStarClick() {
    this.setState({ rating:  })
  }

  render() {
    return(
      <StarRatingComponent 
        name="starRating" 
        starCount={10}
        value={this.state.rating}
        onStarClick={() => this.onStarClick()}
      />
    )
  }
}

export default StarRating;