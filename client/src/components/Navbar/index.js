import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import Auth from './../../utils/auth';

import "./style.css";

const AppNavbar = () => {

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
	    <Nav>
	      <Navbar.Brand as={Link} to="/">Social-Media site </Navbar.Brand>
	      <Nav.Link as={Link} to="/search">Search for user </Nav.Link>
              {Auth.loggedIn() ? (
		<>
		  <Nav.Link as={Link} to='/user/self'>
                    Your Profile
		  </Nav.Link>
		  <Nav.Link onClick={() => Auth.logout}>Logout</Nav.Link>
		</>
              ) : (
		<Nav.Link to="/login">Login/Sign Up</Nav.Link>
              )}
	    </Nav>
      </Navbar>      
    </>
  );
};

export default AppNavbar;
