import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import { LOGIN_USER } from './../../utils/mutations';
import Auth from './../../utils/auth';
import { UserContext, useUserContext, UserContextProvider } from "./../../utils/UserContext";


const Login = (props) => {

//  const {userId, loginUser, logoutUser} = useUserContext(); 
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
	  email: formState.email,
	  password: formState.password
	}})
      Auth.login(data.login.token, data.login.user.id);
    } catch (e) {
      console.log(e);
    }
    setFormState({
      ...formState,
      email: "",
      password: ""
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const sendToSignUp = (event) => {
    event.preventDefault();
    window.location.assign("/signup");
  }
    

  return (
    <div className="loginPage" id="loginEntry">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="attribute">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="attribute">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="attribute">
          <button type="submit">Submit</button>
	  <button type="button" onClick={sendToSignUp}>Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
