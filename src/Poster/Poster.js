import React from 'react';
import './Poster.css';
import { Link } from 'react-router-dom';

const Poster = ({ id, title, rating, image }) => {

  return(
    <Link to={`/movie/${id}`}>
      <section className='poster' id={id}>
        <img className='card-img' src={image} alt={title} />
        <p className='poster-title'>{title}</p>
        <p className='poster-rating'>&#9734; {rating.toFixed(1)}/10</p>
        <p className='poster-rating-mini'>&#9734; {rating.toFixed(1)}/10</p>
      </section>
    </Link>
  )
}

export default Poster;