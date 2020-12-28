import ReactStars from "react-rating-stars-component";
import React, { Component } from "react";

class StarRating extends Component { 
  constructor() {
    super();
    this.state = {
      rating: 0
    }
  }

  handleStarChange = (newRating) => {
    this.setState({ rating: newRating })
  };

  render() {
    return(
      <section>
        <ReactStars
        value={this.state.rating}
        isHalf={true}
        count={10}
        onChange={this.handleStarChange}
        size={24}
        activeColor="#ffd700"
      />
      Your Rating is: {this.state.rating}
      </section>
    )
  }
}

export default StarRating;