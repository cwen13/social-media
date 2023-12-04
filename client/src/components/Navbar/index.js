import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "./../../utils/UserContext";
import Auth from './../../utils/auth';
import "./style.css";

const Navbar = () => {

  const { userId, loginUser, logoutUser } = useUserContext();
  
  const showNav = () => {
    return (Auth.loggedIn() ? (
      <>
	<Link onClick={() => Auth.logout()}>
	  <h4>Logout</h4>
	</Link>
      </>
    ) : (
      <>
      <Link to="/login">
	<h4>Login</h4>
      </Link>
      <Link to="/signup">
	<h4>Sign Up</h4>
      </Link>
      </>
    ));
  };
  
  return (
    <>
      <nav className="navbar-nav">
	  <Link  to="/user/MyPage"><h1>Social-Media site </h1></Link>
	  <Link to="/search"><h4>Search for user </h4></Link>
	{showNav()}
      </nav>      
    </>
  );
};

export default Navbar;
