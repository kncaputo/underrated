import React from 'react';
import './Poster.css';

const Poster = ({ id, title, rating, image }) => {
  return(
    <section className='poster' id={id}>
      <img className='card-img' src={image} alt={title} />
      <p className='poster-title'>{title}</p>
      <p className='poster-rating'>Average Rating: {rating.toFixed(1)} / 10</p>
    </section>
  )
}

export default Poster;