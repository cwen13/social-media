import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_USER } from './../utils/mutations';
import Auth from './../utils/auth';
import { UserContext, useUserContext, UserContextProvider } from "./../utils/UserContext";


const Login = (props) => {

  const {userId, setUserId, loginUser, logoutUser} = useUserContext(); 
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();
  const prevUserId = userId;

  let token;
  
  useEffect(() => {
    if (Auth.loggedIn()) {
      console.log("USEEFFECT:", userId)
      return (navigate("/"));
    }
  }, [userId, navigate, token]);

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
	  email: formState.email,
	  password: formState.password
	}})
      console.log("LOGGIN:", userId)
      Auth.login(data.login.token);
      await loginUser(data.login.user.id);

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

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
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
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
