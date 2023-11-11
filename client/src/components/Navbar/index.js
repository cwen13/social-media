import React from 'react';
import { Link } from 'react-router-dom';

import Auth from './../../utils/auth';
import "./style.css";

const AppNavbar = () => {
  const showNav = () => {
    return (Auth.loggedIn() ? (
      <>
	<Link>
	  <h4 as={Link} to='/user/:userId'>
            Your Profile
	  </h4>
	</Link>
	<Link>
	  <h4 onClick={() => Auth.logout()}>
	    Logout
	  </h4>
	</Link>
      </>
    ) : (
      <>
      <Link>
	<h4 as={Link} to="/login">
	  Login
	</h4>
      </Link>
      <Link>
	<h4 as={Link} to="/signUp">
	  Sign Up
	</h4>
      </Link>
      </>
    ));
  };
  
  return (
    <>
      <nav className="navbar-nav">
	  <Link  to="/"><h1>Social-Media site </h1></Link>
	  <Link to="/search"><h4>Search for user </h4></Link>
	{showNav()}
      </nav>      
    </>
  );
};

export default AppNavbar;
