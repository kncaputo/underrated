import React from 'react';
import './Poster.css';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Poster = ({ id, title, rating, image }) => {
  const ratingLevel = () => {
    if (rating < 5) {
      return <BsStar />
    } else if (rating >= 5 && rating < 7) {
      return <BsStarHalf />
    } else if (rating >= 7) {
      return <BsStarFill />
  }
}

  return(
    <Link to={`/movie/${id}`}>
      <section className='poster' id={id}>
        <img className='card-img' src={image} alt={title} />
        <p className='poster-title'>{title}</p>
        <p className='poster-rating'>{ratingLevel()} {(rating*10).toFixed(0)}%</p>
        <p className='poster-rating-mini'>{(rating*10).toFixed(0)}%</p>
      </section>
    </Link>
  )
}

export default Poster;