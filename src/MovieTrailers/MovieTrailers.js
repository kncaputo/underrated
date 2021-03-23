import React, { Component } from 'react';
import { fetchMovieTrailers } from '../apiCalls';
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MovieTrailers.scss';

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

  determineAvailableTrailers = () => {
    return this.state.trailers.find(trailer => {
      return trailer.site === "YouTube"
    })
  }
  
  formatTrailers = () => {
    return this.state.trailers.map(trailer => {
      if(trailer.site === "YouTube") {
        return (
          <ReactPlayer 
            key={trailer.id}
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
          />  
        )  
      }
    })
  }

  render() {
    return(
      <section className="trailers">
        {this.determineAvailableTrailers() &&
          <Carousel
            showThumbs={false}
          >
            {this.formatTrailers()}
          </Carousel>  
        }
        {!this.determineAvailableTrailers() &&
          <p>Sorry, no available trailers for this movie.</p>
        }
      </section>
    )
  }
}

export default MovieTrailers;