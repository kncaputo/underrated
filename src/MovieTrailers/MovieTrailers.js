import React, { Component } from 'react';
import { fetchMovieTrailers } from '../apiCalls';
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './MovieTrailers.css';

class MovieTrailers extends Component {
  constructor() {
    super();
    this.state = {
      trailers: [],
      error: ''
    }
  } 

  componentDidMount() {
    fetchMovieTrailers(this.props.id)
    .then(movieTrailers => this.setState({ trailers: movieTrailers.videos }))
    .catch(error => this.setState({ error: error.message }))
  }

  formatTrailers = () => {
    return this.state.trailers.map(trailer => {
      return (
        <ReactPlayer 
          key={trailer.id}
          url={`https://www.youtube.com/watch?v=${trailer.key}`}
        />  
      )  
    })
  }


  render() {
    return(
      <section className="trailers">
        <Carousel>
          {this.formatTrailers()}
        </Carousel>  
      </section>
    )
  }
}

export default MovieTrailers;