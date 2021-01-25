import React from 'react';
import Login from '../Login/Login';
import { Link, NavLink } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Header.scss';

const Header = (props) => {
  const { currentUser, validateLogin, error, clearError, signOut } = props;
  
  return(
    <header>
      <Link to='/'>
        <h1 className='page-title'>underrated</h1>
      </Link>
      <nav>
        <NavLink exact to='/' className='nav-labels'>
          all movies
        </NavLink>
        <NavLink exact to='/watchlist' className='nav-labels'>
          watchlist
        </NavLink>
        <DropdownButton 
          className='nav-labels' 
          title='account'
          size='lg'>
            {!currentUser &&
              <Login 
                validateLogin={validateLogin} 
                error={error} 
                clearError={clearError}
              />
            }
            {currentUser &&
              <section>
                <p id='user-message'>Hello, {currentUser.name}!</p>
                <button id='sign-out' onClick={signOut}>Sign Out</button>
              </section>     
            }
        </DropdownButton>
      </nav>
    </header>
  ) 
}

export default Header;