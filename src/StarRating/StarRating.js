import ReactStars from "react-rating-stars-component";
import React, { Component } from "react";

class StarRating extends Component { 
  constructor() {
    super();
    this.state = {
      rating: 2
    }
  }

  handleStarChange = (newRating) => {
    this.setState({ rating: newRating })
  };

  render() {
    return(
      <ReactStars
        value={this.state.rating}
        count={10}
        onChange={this.handleStarChange}
        size={24}
        activeColor="#ffd700"
      />
    )
  }
}

export default StarRating;