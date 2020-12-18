import React from 'react';
import './Poster.css';

const Poster = ({ id, title, rating, image }) => {
  return(
    <section className='poster' id={id}>
      <img className='card-img' src={image} alt={title} />
      <h1>{title}</h1>
      <p>{rating.toFixed(2)}</p>
    </section>
  )
}

export default Poster;