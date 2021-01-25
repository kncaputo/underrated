import React from 'react';
import Login from '../Login/Login';
import { Route, NavLink, Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Header.css';

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
          title='account'>
            {!currentUser &&
              <Login 
                validateLogin={validateLogin} 
                error={error} 
                clearError={clearError}
              />
            }
            {currentUser &&
              <section>
                <p>Hello, {currentUser.name}!</p>
                <button onClick={signOut}>Sign Out</button>
              </section>     
            }
        </DropdownButton>
      </nav>
    </header>
  ) 
}

export default Header;