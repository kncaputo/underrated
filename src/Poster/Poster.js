import React from 'react';
import './Poster.css';
import { Link } from 'react-router-dom';

const Poster = ({ id, title, rating, image }) => {

  return(
    <Link to={`/movie/${id}`}>
      <section className='poster' id={id}>
        <img className='card-img' src={image} alt={title} />
        <p className='poster-title'>{title}</p>
        <p className='poster-rating'>{(rating*10).toFixed(0)}%</p>
        <p className='poster-rating-mini'>{(rating*10).toFixed(0)}%</p>
      </section>
    </Link>
  )
}

export default Poster;