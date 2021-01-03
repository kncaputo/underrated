import React, { Component } from 'react';
import { fetchMovieTrailers } from '../apiCalls';
import ReactPlayer from 'react-player/youtube';
import './Banner.css';

class Banner extends Component {
  constructor() {
    super();
    this.state = {
      currentMovie: null,
      trailers: null,
      error: ''
    }
  }

  componentDidMount() {
    fetchMovieTrailers(694919)
    .then(trailers => this.setState({ trailers }))
    .catch(error => this.setState({ error: error.message}))
  }

  displayTrailer = () => {
    const trailerDisplay = this.state.trailers.videos.find(trailer => {
      return trailer.site === "YouTube"
    })

    if (trailerDisplay) {
      return(
        <section className="player-wrapper">
          <ReactPlayer 
              key={trailerDisplay.id}
              url={`https://www.youtube.com/watch?v=${trailerDisplay.key}`}
              className="react-player"
              width="100%"
              height="100%"
              controls={false}
              muted={true}
              playing={true}
              loop={true}
              config={{
                youtube: {
                  playerVars: {
                    disablekb: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    playlist: `${this.state.movieTrailer}`,
                    modestbranding: 1,
                  },
                },
              }}
          />  
        </section>
      )
    }
  }

  render() {
    return(
      <section>
        {!this.state.trailers && <p>Loading...</p>}
        {this.state.trailers && this.displayTrailer()}
      </section>
    )
  }
}

export default Banner;