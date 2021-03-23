import React from 'react';
import Poster from '../Poster/Poster';
import './MovieGrid.scss';

const MovieGrid = ({ movies }) => {
  const posters = movies.map(movie => {
    return(
      <Poster
        id={movie.id}
        title={movie.title}
        rating={movie.average_rating}
        image={movie.poster_path}
        key={movie.id}
      />  
    )
  })
  return(
    <section className='movie-grid'>
      {posters}
    </section>
  )
}

export default MovieGrid;

