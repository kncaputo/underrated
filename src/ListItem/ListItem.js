import React from 'react';
import './ListItem.scss';

const ListItem =  ({ label, body })  => {

  const formatBody = () => {
    if (body === '$0') {
      return '-'
    }
    return body;
  }

  return (
    <section className='details-box'>
      <p className='l-details'><b>{label}</b></p>
      <p className='r-details'>{formatBody()}</p>
    </section>
  );
}

export default ListItem;