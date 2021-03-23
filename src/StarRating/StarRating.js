import ReactStars from 'react-rating-stars-component';
import React, { Component } from 'react';

class StarRating extends Component { 
  constructor() {
    super();
    this.state = {
      rating: 0
    }
  }

  componentDidMount() {
    this.setState({ rating: this.props.currentUserRating })
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUserRating !== prevProps.currentUserRating) {
      this.setState({ rating: this.props.currentUserRating })
    }
  }
  
  handleStarChange = (newRating) => {
    this.setState({ rating: newRating })
    this.props.setStarRating(newRating)
  }

  handleRatingText() {
    if (this.props.currentUser === null) {
      return <p>Please log in to rate</p>
    } else if (this.props.currentUserRating === 0) {
      return <p>Rate this movie</p>
    }
    return <p>Your rating is {this.state.rating}</p>
  }

  render() {
    return(
      <section>
        {this.handleRatingText()}
        <ReactStars
          key={Math.random()}
          value={this.state.rating}
          edit={this.props.canEdit}
          count={10}
          onChange={this.handleStarChange}
          size={24}
          activeColor="#ffd700"
        />
      </section>
    )
  }
}

export default StarRating;