import React from 'react';
import './ListItem.css';

const ListItem =  ({ label, body })  => {
  return (
    <section className='details-box'>
      <p className='l-details'><b>{label}</b></p>
      <p className='r-details'>{body}</p>
    </section>
  );
}

export default ListItem;